import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { supabase, isSupabaseConfigured } from '../supabaseClient'
import MotionReveal from '../components/MotionReveal'

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const isEmailJSConfigured = !!(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY)

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const [sentName, setSentName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function sendEmailNotification(formData) {
    if (!isEmailJSConfigured) return
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    formData.name,
          from_email:   formData.email,
          message:      formData.message,
          to_email:     'klydejosephy@gmail.com',
          reply_to:     formData.email,
        },
        EMAILJS_PUBLIC_KEY
      )
    } catch (emailErr) {
      console.warn('EmailJS notification failed:', emailErr)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErrorMessage('')

    if (!form.name || !form.email || !form.message) {
      setStatus('error')
      setErrorMessage('Please fill in all fields before sending.')
      return
    }

    if (!isSupabaseConfigured) {
      setSentName(form.name.split(' ')[0])
      setStatus('missing-env')
      setForm({ name: '', email: '', message: '' })
      return
    }

    setStatus('submitting')

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{ name: form.name, email: form.email, message: form.message }])

      if (error) throw error

      await sendEmailNotification(form)

      setSentName(form.name.split(' ')[0])
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error('Error inserting message:', err)
      setStatus('error')
      setErrorMessage(err.message || 'Failed to send message.')
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

      <section className="section contact-page">
        <div className="container contact-page-inner">
          <MotionReveal>
            <div className="contact-info-list">
              <a className="contact-info-row" href="mailto:klydejosephy@gmail.com">
                <span>Email</span>
                <span>klydejosephy@gmail.com</span>
              </a>
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
            <form onSubmit={handleSubmit} className="contact-form">
              <h2 className="contact-form-title">Send a message</h2>

              {status === 'error' && <p className="form-error">{errorMessage}</p>}
              {status === 'success' && (
                <p className="form-success">Message sent. Talk soon, {sentName}.</p>
              )}
              {status === 'missing-env' && (
                <p className="form-success">
                  Demo mode — add Supabase keys in <code>.env</code> to enable live submissions.
                </p>
              )}

              <div className="form-field">
                <input id="name" name="name" type="text" placeholder=" " value={form.name} onChange={handleChange} disabled={status === 'submitting'} />
                <label htmlFor="name">Full Name</label>
              </div>

              <div className="form-field">
                <input id="email" name="email" type="email" placeholder=" " value={form.email} onChange={handleChange} disabled={status === 'submitting'} />
                <label htmlFor="email">Email Address</label>
              </div>

              <div className="form-field">
                <textarea id="message" name="message" rows={5} placeholder=" " value={form.message} onChange={handleChange} disabled={status === 'submitting'} />
                <label htmlFor="message">Your Message</label>
              </div>

              <button type="submit" className="btn btn-primary submit-btn" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </MotionReveal>
        </div>
      </section>
    </div>
  )
}
