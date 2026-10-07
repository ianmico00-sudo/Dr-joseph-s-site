// Sends a contact-form message by email through Web3Forms (https://web3forms.com),
// a form-to-email service that needs no server of our own. The access key is
// tied to the inbox that should receive messages; set it in .env as
// VITE_WEB3FORMS_KEY (see .env.example).
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

export const emailSendingConfigured = Boolean(ACCESS_KEY);

export async function sendContactMessage({ name, email, purpose, message, botcheck }) {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: ACCESS_KEY,
      subject: `Website inquiry (${purpose}) from ${name}`,
      from_name: 'Dr. Joseph Ryarasa Nkurunziza website',
      name,
      email,
      purpose,
      message,
      botcheck,
    }),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.success) {
    throw new Error(result.message || 'The message could not be sent.');
  }
}

// Used when no access key is set: opens the visitor's own email app with the message filled in.
export function mailtoLink(to, { name, email, purpose, message }) {
  const subject = `Website inquiry: ${purpose}`;
  const body = `${message}\n\n${name}\n${email}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
