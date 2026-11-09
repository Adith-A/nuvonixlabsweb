// Contact form delivery: emails each message via Web3Forms (https://web3forms.com).
// The access key routes submissions to contact@nuvonixlabs.com. It is public by
// design (it can only send to that inbox), so it is safe to keep in client code.
const WEB3FORMS_ACCESS_KEY = '729a9919-86a3-4ee0-b86a-999beb4ec785';
const ENDPOINT = 'https://api.web3forms.com/submit';
const TIMEOUT_MS = 15000;

export interface ContactMessage {
  name: string;
  email: string;
  organization?: string;
  message: string;
  /** Optional phone number (used by the small-business inquiry form). */
  phone?: string;
  /** Which form sent it, shown in the email subject, e.g. "Small business AI setup". */
  source?: string;
}

export async function sendContactEmail(data: ContactMessage): Promise<void> {
  const name = data.name.trim().slice(0, 128);
  const email = data.email.trim().slice(0, 256);
  const organization = (data.organization || '').trim().slice(0, 128);
  const message = data.message.trim().slice(0, 4096);
  const phone = (data.phone || '').trim().slice(0, 40);
  const source = (data.source || '').trim().slice(0, 80);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `${source || 'Nuvonix Labs contact form'}: ${name}${organization ? ` (${organization})` : ''}`,
        from_name: 'Nuvonix Labs website',
        replyto: email,
        name,
        email,
        organization: organization || '(not provided)',
        ...(phone ? { phone } : {}),
        message,
      }),
      signal: controller.signal,
    });

    let body: { success?: boolean | string; message?: string } = {};
    try {
      body = await res.json();
    } catch {
      // non-JSON response; fall through to the status check
    }

    const ok = res.ok && (body.success === true || body.success === 'true');
    if (!ok) {
      throw new Error(body.message || `Contact form request failed (${res.status})`);
    }
  } finally {
    clearTimeout(timer);
  }
}
