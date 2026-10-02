import emailjs from '@emailjs/browser'
import { profile } from '@/data/profile'
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient'

/**
 * Contact submission: VITE_CONTACT_ENDPOINT webhook, or Supabase + EmailJS,
 * then mailto as a fallback.
 */

export const ENDPOINT: string = import.meta.env.VITE_CONTACT_ENDPOINT ?? ''
export const RECIPIENT = profile.email

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim()
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim()
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim()

export const isEmailJSConfigured = !!(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY)

export const MAX_NAME = 80
export const MAX_EMAIL = 254
export const MAX_MESSAGE = 5000

const CTRL_NO_NL = new RegExp('[\\u0000-\\u001F\\u007F]', 'g')
const CTRL_KEEP_NL = new RegExp('[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F]', 'g')
const ZERO_WIDTH = new RegExp('[\\u200B-\\u200F\\u202A-\\u202E\\u2060\\uFEFF]', 'g')

export function sanitize(input: string, allowNewlines = false): string {
  const controls = allowNewlines ? CTRL_KEEP_NL : CTRL_NO_NL
  return input.replace(controls, '').replace(ZERO_WIDTH, '')
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type Lead = {
  firstName: string
  lastName: string
  email: string
  message: string
  website: string
}

export type SubmitResult =
  | { via: 'webhook' }
  | { via: 'mailto' }
  | { via: 'backend'; savedToDatabase: boolean; emailed: boolean; emailError?: string }

export function readLead(data: FormData): Lead | null {
  const firstName = sanitize(String(data.get('firstName') ?? '').trim()).slice(0, MAX_NAME)
  const lastName = sanitize(String(data.get('lastName') ?? '').trim()).slice(0, MAX_NAME)
  const email = sanitize(String(data.get('email') ?? '').trim()).slice(0, MAX_EMAIL)
  const message = sanitize(String(data.get('message') ?? '').trim(), true).slice(0, MAX_MESSAGE)
  if (!firstName || !lastName || !email || !message || !EMAIL_RE.test(email)) return null
  const website = String(data.get('website') ?? '')
  return { firstName, lastName, email, message, website }
}

export class SubmitError extends Error {}

function fullName(lead: Lead) {
  return `${lead.firstName} ${lead.lastName}`.trim()
}

async function saveToSupabase(lead: Lead) {
  if (!isSupabaseConfigured || !supabase) return false
  const { error } = await supabase.from('contact_messages').insert([
    {
      name: fullName(lead),
      email: lead.email,
      message: lead.message,
    },
  ])
  if (error) throw new SubmitError(`Database: ${error.message}`)
  return true
}

async function sendEmailJS(lead: Lead) {
  if (!isEmailJSConfigured) return false
  await emailjs.send(
    EMAILJS_SERVICE_ID!,
    EMAILJS_TEMPLATE_ID!,
    {
      to_email: RECIPIENT,
      name: fullName(lead),
      from_name: fullName(lead),
      from_email: lead.email,
      message: lead.message,
      reply_to: lead.email,
      time: new Date().toLocaleString('en-PH', { timeZone: 'Asia/Manila' }),
    },
    { publicKey: EMAILJS_PUBLIC_KEY! },
  )
  return true
}

export async function submitLead(lead: Lead): Promise<SubmitResult> {
  if (lead.website.trim()) {
    throw new SubmitError('Something went wrong. Email me directly instead.')
  }

  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => null)
      throw new SubmitError(body?.error || `The server answered ${res.status}.`)
    }
    return { via: 'webhook' }
  }

  if (isSupabaseConfigured || isEmailJSConfigured) {
    let savedToDatabase = false
    let emailed = false
    let emailError: string | undefined

    if (isSupabaseConfigured) {
      savedToDatabase = await saveToSupabase(lead)
    }

    if (isEmailJSConfigured) {
      try {
        emailed = await sendEmailJS(lead)
      } catch (err) {
        emailError = err instanceof Error ? err.message : 'Email delivery failed'
        if (!savedToDatabase) throw new SubmitError(emailError)
      }
    }

    if (!savedToDatabase && !emailed) {
      throw new SubmitError('Message could not be delivered. Please email directly.')
    }

    return { via: 'backend', savedToDatabase, emailed, emailError }
  }

  const subject = `Project inquiry from ${fullName(lead)}`
  const body = [`Name: ${fullName(lead)}`, `Email: ${lead.email}`, '', lead.message].join('\n')
  window.location.href = `mailto:${encodeURIComponent(RECIPIENT)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  return { via: 'mailto' }
}
