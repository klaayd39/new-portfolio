import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { supabase, isSupabaseConfigured } from '../supabaseClient'
import ScrollReveal from '../components/ScrollReveal'

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

      <section className="contact-section">
        <div className="wrap contact-inner">
          <ScrollReveal>
            <span className="label">Get in Touch</span>
            <h1 className="contact-h">Looking for an <em>automation role.</em></h1>
            <p className="contact-desc">
              Whether you have a question about station workflows or want to talk about a role,
              write directly. I read every message.
            </p>
          </ScrollReveal>

          <div className="contact-list" style={{ marginBottom: 40 }}>
            <a className="cl-row" href="mailto:klydejosephy@gmail.com">
              <span className="cl-lbl">Email</span>
              <span className="cl-val">klydejosephy@gmail.com</span>
            </a>
            <a className="cl-row" href="tel:+639455927782">
              <span className="cl-lbl">Phone</span>
              <span className="cl-val">+63 945 592 7782</span>
            </a>
            <div className="cl-row">
              <span className="cl-lbl">Location</span>
              <span className="cl-val">Malaybalay City, Bukidnon, Philippines</span>
            </div>
            <div className="cl-row">
              <span className="cl-lbl">Status</span>
              <span className="cl-val cl-avail">Available now · Actively looking</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <h3 className="contact-form-title">Send a message</h3>

            {status === 'error' && <p className="form-error">{errorMessage}</p>}
            {status === 'success' && (
              <p className="form-success">Message sent. Talk soon, {sentName}.</p>
            )}
            {status === 'missing-env' && (
              <p className="form-success">
                Demo mode — add Supabase keys in <code>.env</code> to enable live submissions.
              </p>
            )}

            <div className="form-field-floating">
              <input
                id="name"
                name="name"
                type="text"
                placeholder=" "
                value={form.name}
                onChange={handleChange}
                disabled={status === 'submitting'}
              />
              <label htmlFor="name">Full Name</label>
            </div>

            <div className="form-field-floating">
              <input
                id="email"
                name="email"
                type="email"
                placeholder=" "
                value={form.email}
                onChange={handleChange}
                disabled={status === 'submitting'}
              />
              <label htmlFor="email">Email Address</label>
            </div>

            <div className="form-field-floating">
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder=" "
                value={form.message}
                onChange={handleChange}
                disabled={status === 'submitting'}
              />
              <label htmlFor="message">Your Message</label>
            </div>

            <button
              type="submit"
              className="btn btn-dark submit-btn"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
