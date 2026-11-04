// Contact form delivery: emails each message via FormSubmit (https://formsubmit.co).
// The first message sent from the live site triggers a one-time "Activate Form"
// email to CONTACT_INBOX; messages are delivered once that link is clicked.
const CONTACT_INBOX = 'contact@nuvonixlabs.com';
const ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_INBOX}`;

export interface ContactMessage {
  name: string;
  email: string;
  organization?: string;
  message: string;
}

export async function sendContactEmail(data: ContactMessage): Promise<void> {
  const name = data.name.trim().slice(0, 128);
  const email = data.email.trim().slice(0, 256);
  const organization = (data.organization || '').trim().slice(0, 128);
  const message = data.message.trim().slice(0, 4096);

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      organization: organization || '(not provided)',
      message,
      _subject: `Nuvonix Labs contact form: ${name}${organization ? ` (${organization})` : ''}`,
      _replyto: email,
      _template: 'table',
      _captcha: 'false',
    }),
  });

  let body: { success?: string | boolean; message?: string } = {};
  try {
    body = await res.json();
  } catch {
    // non-JSON response; fall through to the status check
  }

  const ok = res.ok && (body.success === true || body.success === 'true');
  if (!ok) {
    throw new Error(body.message || `Contact form request failed (${res.status})`);
  }
}
