import { useState, type FormEvent } from 'react'
import { PaperPlaneTilt, CheckCircle, WarningCircle, EnvelopeSimple, ArrowUpRight } from '@/components/slab'
import { profile } from '@/data/profile'
import { readLead, submitLead, SubmitError, MAX_NAME, MAX_EMAIL, MAX_MESSAGE, type SubmitResult } from '@/lib/contact'

/**
 * ContactGrid - the Contact view as a fixed viewport.
 *
 * One glass sheet with the form. Sized to the panel; the message box takes
 * whatever height is left.
 *
 * Submission goes through lib/contact.ts.
 */

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'error'; note: string }
  | { kind: 'sent'; result: SubmitResult }

const FLIGHT_MS = 650

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export default function ContactGrid() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [shake, setShake] = useState(0)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const lead = readLead(new FormData(e.currentTarget))
    if (!lead) {
      setStatus({ kind: 'error', note: 'Add your name, a real email, and a short note.' })
      setShake((n) => n + 1)
      return
    }
    setStatus({ kind: 'sending' })
    try {
      const [result] = await Promise.all([submitLead(lead), wait(FLIGHT_MS)])
      setStatus({ kind: 'sent', result })
    } catch (err) {
      const note = err instanceof SubmitError ? err.message : 'That did not go through. Email me directly instead.'
      setStatus({ kind: 'error', note })
      setShake((n) => n + 1)
    }
  }

  const busy = status.kind === 'sending'

  return (
    <section className="pgrid cgrid" aria-labelledby="contact-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Contact</span>
        <h1 className="pgrid__title" id="contact-title">
          Let&apos;s build systems that work while you sleep.
        </h1>
        <p className="pgrid__lede">
          Hiring for automation, broadcast systems, or full-stack development? I read every message — Supabase storage and EmailJS alerts when configured, or email klydejosephy@gmail.com directly.
        </p>
      </header>

      <div className="home__glass cgrid__glass">
        <div className="cgrid__panel">
          {status.kind === 'sent' ? (
            <div className="cgrid__done" role="status">
              <span className="cgrid__done-mark" aria-hidden="true">
                <CheckCircle size={30} weight="fill" />
              </span>
              <h2 className="cgrid__done-title">
                {status.result.via === 'mailto' ? 'Your mail app has it.' : 'Got it.'}
              </h2>
              <p className="cgrid__done-body">
                {status.result.via === 'webhook' &&
                  'It is in my inbox and on my phone. You will hear back within one business day.'}
                {status.result.via === 'mailto' &&
                  'The message is laid out and addressed. Press send there and you will hear back within one business day.'}
                {status.result.via === 'backend' &&
                  (status.result.emailError
                    ? `Saved securely. The email alert failed (${status.result.emailError}) — I still received it.`
                    : 'Saved and on its way to my inbox. You will hear back within one business day.')}
              </p>
              <button type="button" className="cgrid__again" onClick={() => setStatus({ kind: 'idle' })}>
                Write another
              </button>
            </div>
          ) : (
            <>
              <div className="cgrid__direct cgrid__direct--panel">
                <a className="cgrid__mail cgrid__mail--panel" href={`mailto:${profile.email}`}>
                  <EnvelopeSimple size={16} weight="fill" aria-hidden="true" />
                  <span>{profile.email}</span>
                </a>
                <ul className="cgrid__socials" role="list">
                  {profile.socials.map((s) => (
                    <li key={s.label}>
                      <a
                        className="cgrid__social cgrid__social--panel"
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                      >
                        <img src={s.iconPath} alt="" loading="lazy" decoding="async" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <form className={`cgrid__form${busy ? ' is-sending' : ''}`} onSubmit={onSubmit} noValidate>
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="cgrid__trap"
                />
                <div className="cgrid__row">
                  <label className="cgrid__field">
                    <span className="cgrid__label">First name</span>
                    <input type="text" name="firstName" autoComplete="given-name" required maxLength={MAX_NAME} placeholder="First name" />
                  </label>
                  <label className="cgrid__field">
                    <span className="cgrid__label">Last name</span>
                    <input type="text" name="lastName" autoComplete="family-name" required maxLength={MAX_NAME} placeholder="Last name" />
                  </label>
                </div>

                <label className="cgrid__field">
                  <span className="cgrid__label">Email</span>
                  <input type="email" name="email" autoComplete="email" required maxLength={MAX_EMAIL} placeholder="you@yourbusiness.com" />
                </label>

                <label className="cgrid__field cgrid__field--grow">
                  <span className="cgrid__label">Your message</span>
                  <textarea
                    name="message"
                    required
                    maxLength={MAX_MESSAGE}
                    placeholder="What would you like to work on together?"
                  />
                </label>

                <div className="cgrid__actions">
                  <button
                    key={shake}
                    type="submit"
                    className={`cgrid__submit${busy ? ' is-sending' : ''}${status.kind === 'error' ? ' is-shaking' : ''}`}
                    disabled={busy}
                  >
                    <span className="cgrid__submit-plane" aria-hidden="true">
                      <PaperPlaneTilt size={17} weight="fill" />
                    </span>
                    <span className="cgrid__submit-label">{busy ? 'Sending' : 'Send message'}</span>
                    <ArrowUpRight className="cgrid__submit-arrow" size={15} weight="bold" aria-hidden="true" />
                  </button>
                  {status.kind === 'error' ? (
                    <span className="cgrid__status" role="alert">
                      <WarningCircle size={16} weight="fill" aria-hidden="true" />
                      {status.note}
                    </span>
                  ) : (
                    <span className="cgrid__hint">I usually reply within 24 hours (GMT+8).</span>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
