import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { supabase, isSupabaseConfigured } from '../supabaseClient'
import MotionReveal from '../components/MotionReveal'
import CopyButton from '../components/CopyButton'

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim()
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim()
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim()
const CONTACT_INBOX = 'klydejosephy@gmail.com'
const isEmailJSConfigured = !!(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY)

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getDeliveryCopy({ savedToDatabase, emailed, emailError }) {
  if (savedToDatabase && emailed) {
    return {
      status: 'success',
      label: 'Message sent',
      note: `Saved and emailed to ${CONTACT_INBOX}. Check Inbox and Spam if you do not see a reply soon.`,
    }
  }

  if (savedToDatabase && emailError) {
    return {
      status: 'warning',
      label: 'Message saved',
      note: `Your message is stored, but the Gmail notification failed (${emailError}). I still received it — or email ${CONTACT_INBOX} directly if you need a faster reply.`,
    }
  }

  if (savedToDatabase) {
    return {
      status: 'warning',
      label: 'Message saved',
      note: 'Your message was saved to the database. Email notifications are not active on this build, so also email klydejosephy@gmail.com if you need a quick reply.',
    }
  }

  if (emailed) {
    return {
      status: 'success',
      label: 'Email sent',
      note: `Notification sent to ${CONTACT_INBOX}. I usually reply within 24 hours.`,
    }
  }

  return {
    status: 'error',
    label: 'Could not send',
    note: 'Something went wrong. Please try again or email directly.',
  }
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const [sentName, setSentName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [deliveryLabel, setDeliveryLabel] = useState('')
  const [deliveryNote, setDeliveryNote] = useState('')

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function sendEmailNotification(formData) {
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_email: CONTACT_INBOX,
        name: formData.name,
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        reply_to: formData.email,
        time: new Date().toLocaleString('en-PH', { timeZone: 'Asia/Manila' }),
      },
      { publicKey: EMAILJS_PUBLIC_KEY }
    )
    return result
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErrorMessage('')
    setDeliveryLabel('')
    setDeliveryNote('')

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error')
      setErrorMessage('Please fill in all fields before sending.')
      return
    }

    if (!EMAIL_PATTERN.test(form.email.trim())) {
      setStatus('error')
      setErrorMessage('Enter a valid email address so I can reply.')
      return
    }

    if (!isSupabaseConfigured && !isEmailJSConfigured) {
      setStatus('error')
      setErrorMessage(`Contact form is not configured yet. Email ${CONTACT_INBOX} directly.`)
      return
    }

    setStatus('submitting')

    let savedToDatabase = false
    let emailed = false
    let emailError = ''

    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase
          .from('contact_messages')
          .insert([{
            name: form.name.trim(),
            email: form.email.trim(),
            message: form.message.trim(),
          }])

        if (error) throw new Error(`Database: ${error.message}`)
        savedToDatabase = true
      }

      if (isEmailJSConfigured) {
        try {
          await sendEmailNotification({
            name: form.name.trim(),
            email: form.email.trim(),
            message: form.message.trim(),
          })
          emailed = true
        } catch (emailErr) {
          emailError = emailErr?.text || emailErr?.message || 'Email delivery failed'
          if (!savedToDatabase) throw new Error(emailError)
        }
      }

      if (!savedToDatabase && !emailed) {
        throw new Error('Message could not be delivered. Please email directly.')
      }

      const delivery = getDeliveryCopy({ savedToDatabase, emailed, emailError })
      setSentName(form.name.trim().split(' ')[0])
      setDeliveryLabel(delivery.label)
      setDeliveryNote(delivery.note)
      setStatus(delivery.status)
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error('Contact form error:', err)
      setStatus('error')
      setErrorMessage(err.message || 'Failed to send message. Please try again or email directly.')
    }
  }

  return (
    <div className="subpage">
      <Helmet>
        <title>Contact | Klyde Joseph Yabo</title>
      </Helmet>

      <section className="subpage-hero">
        <div className="container">
          <MotionReveal>
            <p className="section-label">Contact</p>
            <h1 className="section-title">Let&apos;s talk.</h1>
            <p className="section-intro">
              Whether you have a question about station workflows or want to talk about a role, write directly. I read every message.
            </p>
          </MotionReveal>
        </div>
      </section>

      <section className="section contact-page" aria-labelledby="contact-form-title">
        <div className="container contact-page-inner">
          <MotionReveal>
            <div className="contact-info-list" aria-label="Contact details">
              <div className="contact-info-row contact-info-row--email">
                <a href="mailto:klydejosephy@gmail.com" className="contact-info-row-link">
                  <span>Email</span>
                  <span>klydejosephy@gmail.com</span>
                </a>
                <CopyButton text="klydejosephy@gmail.com" label="Copy" />
              </div>
              <a className="contact-info-row" href="tel:+639455927782">
                <span>Phone</span>
                <span>+63 945 592 7782</span>
              </a>
              <a className="contact-info-row" href="https://github.com/klaayd39" target="_blank" rel="noreferrer">
                <span>GitHub</span>
                <span>github.com/klaayd39</span>
              </a>
              <a className="contact-info-row" href="https://www.linkedin.com/in/klyde-joseph-yabo-a38286373/" target="_blank" rel="noreferrer">
                <span>LinkedIn</span>
                <span>linkedin.com/in/klyde-joseph-yabo</span>
              </a>
              <div className="contact-info-row">
                <span>Location</span>
                <span>Malaybalay City, Bukidnon</span>
              </div>
              <div className="contact-info-row">
                <span>Status</span>
                <span style={{ color: 'var(--accent)' }}>Available now · Actively looking</span>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="contact-form-header">
                <h2 className="contact-form-title" id="contact-form-title">Send a message</h2>
                <p className="contact-form-intro">
                  Share a few details and I&apos;ll get back to you. Most replies go out within 24 hours.
                </p>
              </div>

              <div className="form-status" aria-live="polite" aria-atomic="true">
                {status === 'error' && (
                  <p className="form-error" role="alert">
                    <span className="form-status-label">Couldn&apos;t send</span>
                    {errorMessage}
                  </p>
                )}
                {status === 'success' && (
                  <div className="form-success" role="status">
                    <p>
                      <span className="form-status-label">{deliveryLabel}</span>
                      Talk soon, {sentName}.
                    </p>
                    {deliveryNote && <p className="form-success-note">{deliveryNote}</p>}
                  </div>
                )}
                {status === 'warning' && (
                  <div className="form-warning" role="status">
                    <p>
                      <span className="form-status-label">{deliveryLabel}</span>
                      Talk soon, {sentName}.
                    </p>
                    {deliveryNote && <p className="form-warning-note">{deliveryNote}</p>}
                  </div>
                )}
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="name">Full name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                  autoComplete="name"
                  required
                  aria-required="true"
                />
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="email">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                  autoComplete="email"
                  inputMode="email"
                  required
                  aria-required="true"
                />
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="message">Your message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="What would you like to work on together?"
                  value={form.message}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                  required
                  aria-required="true"
                />
              </div>

              <div className="contact-form-actions">
                <button
                  type="submit"
                  className="btn btn-primary submit-btn"
                  disabled={status === 'submitting'}
                  aria-busy={status === 'submitting'}
                >
                  {status === 'submitting' ? (
                    <>
                      <span className="btn-spinner" aria-hidden="true" />
                      Sending message...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
                <p className="contact-form-footnote">
                  Prefer email? <a href="mailto:klydejosephy@gmail.com">klydejosephy@gmail.com</a>
                </p>
                {(isSupabaseConfigured || isEmailJSConfigured) && (
                  <p className="contact-form-delivery-hint">
                    Delivery: {[
                      isSupabaseConfigured && 'database save',
                      isEmailJSConfigured && 'Gmail notification',
                    ].filter(Boolean).join(' + ')}
                  </p>
                )}
              </div>
            </form>
          </MotionReveal>
        </div>
      </section>
    </div>
  )
}
