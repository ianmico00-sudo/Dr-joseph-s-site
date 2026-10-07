import { useState } from 'react';
import { ArrowRight, Calendar, Mail, MapPin } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { SITE } from '../lib/site.js';
import pages from '../content/pages.json';
import { emailSendingConfigured, mailtoLink, sendContactMessage } from '../lib/contact.js';

const { purposes: PURPOSES, ...HERO } = pages.contact;

const EMPTY = { name: '', email: '', purpose: PURPOSES[0], message: '', botcheck: '' };
const LABEL = 'block text-[11px] tracking-[0.2em] uppercase text-slate font-medium mb-3';
const FIELD =
  'w-full bg-transparent border-0 border-b hairline focus:border-ochre focus:outline-none py-2.5 text-oxford placeholder:text-slate/60 transition-colors';
const ERROR = 'mt-2 text-sm text-red-700';

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  // idle | sending | sent | failed
  const [status, setStatus] = useState('idle');

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Please enter a valid email address.';
    if (!form.message.trim()) next.message = 'Please write a short message.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!emailSendingConfigured) {
      // No email service set up yet: hand the message to the visitor's email app.
      window.location.href = mailtoLink(SITE.email, form);
      return;
    }

    setStatus('sending');
    try {
      await sendContactMessage(form);
      setStatus('sent');
      setForm(EMPTY);
    } catch {
      setStatus('failed');
    }
  };

  return (
    <>
      <PageHero {...HERO} />

      <section className="pb-24 md:pb-32 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              {status === 'sent' ? (
                <div className="border hairline bg-muted/30 p-8 md:p-10" role="status">
                  <h2 className="font-display text-3xl text-oxford">Message sent.</h2>
                  <p className="mt-4 text-slate leading-relaxed">Thank you for reaching out. You will receive a reply by email.</p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-6 py-2 text-sm text-oxford border-b border-oxford/30 hover:border-ochre hover:text-ochre transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="space-y-8" onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="contact-name" className={LABEL}>
                        Full Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        autoComplete="name"
                        className={FIELD}
                        placeholder="Your name"
                        value={form.name}
                        onChange={update('name')}
                        aria-invalid={Boolean(errors.name)}
                      />
                      {errors.name && <p className={ERROR}>{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="contact-email" className={LABEL}>
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className={FIELD}
                        placeholder="you@email.com"
                        value={form.email}
                        onChange={update('email')}
                        aria-invalid={Boolean(errors.email)}
                      />
                      {errors.email && <p className={ERROR}>{errors.email}</p>}
                    </div>
                  </div>

                  <fieldset>
                    <legend className={`${LABEL} mb-4`}>Purpose of Inquiry</legend>
                    <div className="flex flex-wrap gap-2.5">
                      {PURPOSES.map((purpose) => (
                        <button
                          key={purpose}
                          type="button"
                          aria-pressed={form.purpose === purpose}
                          onClick={() => setForm((f) => ({ ...f, purpose }))}
                          className={`px-4 py-2.5 min-h-[44px] text-sm border transition-colors duration-300 ${
                            form.purpose === purpose
                              ? 'border-ochre bg-ochre/10 text-oxford'
                              : 'hairline text-oxford/80 hover:border-ochre/50'
                          }`}
                        >
                          {purpose}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div>
                    <label htmlFor="contact-message" className={LABEL}>
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      className={`${FIELD} resize-none`}
                      placeholder="Share the details of your inquiry…"
                      value={form.message}
                      onChange={update('message')}
                      aria-invalid={Boolean(errors.message)}
                    />
                    {errors.message && <p className={ERROR}>{errors.message}</p>}
                  </div>

                  {/* Hidden field that only spam bots fill in */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    checked={Boolean(form.botcheck)}
                    onChange={(e) => setForm((f) => ({ ...f, botcheck: e.target.checked ? 'on' : '' }))}
                  />

                  {status === 'failed' && (
                    <p className={ERROR} role="alert">
                      Your message could not be sent. Please try again, or email{' '}
                      <a href={`mailto:${SITE.email}`} className="underline">
                        {SITE.email}
                      </a>{' '}
                      directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group inline-flex items-center gap-3 bg-oxford text-background px-8 py-4 hover:bg-ochre transition-colors disabled:opacity-60"
                  >
                    <span className="text-sm tracking-wide font-medium">{status === 'sending' ? 'Sending…' : 'Send Message'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </button>
                </form>
              )}
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={1} className="border hairline bg-muted/30 p-8 md:p-9">
              <div className="text-[11px] tracking-[0.3em] uppercase text-slate font-medium mb-6">Direct Channels</div>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-ochre mt-1 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="text-sm text-oxford font-medium">Email</div>
                    <a href={`mailto:${SITE.email}`} className="text-sm text-slate hover:text-ochre transition-colors break-all">
                      {SITE.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-ochre mt-1 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="text-sm text-oxford font-medium">Location</div>
                    <div className="text-sm text-slate">{SITE.location}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-ochre mt-1 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="text-sm text-oxford font-medium">Availability</div>
                    <div className="text-sm text-slate">{SITE.availability}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
