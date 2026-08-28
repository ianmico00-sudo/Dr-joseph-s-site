import { useState } from 'react';
import { useProfile } from '../context/ProfileContext.jsx';
import './Contact.css';

const reasons = [
  'Collaboration',
  'Speaking engagement',
  'Media inquiry',
  'Academic partnership',
  'Other',
];

const initialForm = { name: '', email: '', reason: reasons[0], message: '' };

export default function Contact() {
  const { profile } = useProfile();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Please enter a valid email.';
    if (!form.message.trim()) next.message = 'Please add a short message.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // NOTE for developer: this form is UI-only for now — no message is actually
    // sent. Wire this up to a mail service (e.g. Microsoft Graph, like the main
    // Never Again Rwanda site) or a form backend before launch.
    setSubmitted(true);
  };

  return (
    <section className="contact-page dot-grid-bg">
      <div className="container contact-page__grid">
        <div className="contact-page__intro">
          <p className="eyebrow">Contact &amp; Engagement</p>
          <h1 className="section-heading">
            Let&rsquo;s work together to move <span className="accent">health and justice</span>{' '}
            forward.
          </h1>
          <hr className="section-rule" />
          <p className="section-sub">
            For collaboration, speaking engagements, media inquiries, or academic partnerships —
            send a message and I&rsquo;ll get back to you.
          </p>

          <dl className="contact-page__details">
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${profile.contactEmail}`}>{profile.contactEmail}</a>
              </dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>Kigali, Rwanda</dd>
            </div>
          </dl>
        </div>

        <div className="contact-page__form-wrap">
          {submitted ? (
            <div className="contact-success">
              <h2>Message received.</h2>
              <p>Thank you for reaching out — I&rsquo;ll get back to you as soon as I can.</p>
              <button type="button" className="btn btn-text" onClick={() => { setForm(initialForm); setSubmitted(false); }}>
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-form__row">
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={update('name')}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <p className="contact-form__error">{errors.name}</p>}
              </div>

              <div className="contact-form__row">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <p className="contact-form__error">{errors.email}</p>}
              </div>

              <div className="contact-form__row">
                <label htmlFor="reason">Reason for contact</label>
                <select id="reason" value={form.reason} onChange={update('reason')}>
                  {reasons.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="contact-form__row">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  aria-invalid={Boolean(errors.message)}
                />
                {errors.message && <p className="contact-form__error">{errors.message}</p>}
              </div>

              <button type="submit" className="btn btn-accent contact-form__submit">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
