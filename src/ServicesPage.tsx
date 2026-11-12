import React, { useState } from 'react';
import { sendContactEmail } from './lib/contact';
import logoMark from './assets/logo-mark.png';
import { SITE_CSS } from './siteStyles';

// Small-business services page: nuvonixlabs.com/services/
// Links use relative paths ("../" = home) so the page works both on the custom
// domain and under a GitHub Pages sub-path.

const SOURCE_URL = 'https://financial-cents.com/?p=39931';
const EMPTY_FORM = { name: '', email: '', firm: '', phone: '', message: '' };

const PAGE_CSS = `
.nx-stat {
  font-size: clamp(2.2rem, 4vw, 2.8rem);
  font-weight: 800;
  color: var(--nx-navy);
  letter-spacing: -0.04em;
  line-height: 1;
}
.nx-stat-word {
  font-size: 1.5rem;
  line-height: 1.15;
  letter-spacing: -0.03em;
  padding-top: 0.35rem;
}
.nx-source {
  margin-top: 28px;
  text-align: center;
  font-size: 0.82rem;
  color: var(--nx-slate-light);
}
.nx-source a {
  color: var(--nx-blue);
  text-decoration: underline;
}
.nx-grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
.nx-test-note {
  margin-top: 28px;
  padding: 18px 22px;
  border-radius: 10px;
  background-color: #F0F7FF;
  border: 1px solid #DCEBFA;
  color: var(--nx-navy);
  font-size: 0.95rem;
  line-height: 1.6;
  text-align: center;
}
.nx-steps {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  counter-reset: nxstep;
}
.nx-step {
  counter-increment: nxstep;
  background-color: var(--nx-white);
  border: 1px solid var(--nx-border);
  border-radius: 12px;
  padding: 28px 26px;
}
.nx-step::before {
  content: counter(nxstep);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: var(--nx-navy);
  color: #ffffff;
  font-weight: 800;
  font-size: 0.95rem;
  margin-bottom: 14px;
}
.nx-price-card {
  max-width: 640px;
  margin: 0 auto;
  background-color: #ffffff;
  border: 1px solid var(--nx-border);
  border-radius: 14px;
  padding: 40px;
  box-shadow: var(--nx-shadow-md);
}
.nx-price-name {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--nx-navy);
  letter-spacing: -0.02em;
}
.nx-price-row {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 10px 0 18px;
}
.nx-price {
  font-size: 3rem;
  font-weight: 800;
  color: var(--nx-navy);
  letter-spacing: -0.04em;
  line-height: 1;
}
.nx-price-unit {
  font-size: 0.95rem;
  color: var(--nx-slate-light);
  font-weight: 600;
}
.nx-offer {
  padding: 12px 16px;
  border-radius: 8px;
  background-color: #ECFDF5;
  border: 1px solid #A7F3D0;
  color: #065F46;
  font-size: 0.93rem;
  line-height: 1.55;
  margin-bottom: 22px;
}
.nx-check-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 22px;
}
.nx-check-list li {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  font-size: 0.95rem;
  color: var(--nx-slate);
  line-height: 1.55;
}
.nx-check-list svg {
  flex-shrink: 0;
  margin-top: 3px;
  color: var(--nx-green);
}
.nx-fine-print {
  font-size: 0.85rem;
  color: var(--nx-slate-light);
  line-height: 1.55;
  margin-top: 16px;
}
.nx-note {
  max-width: 820px;
  margin: 0 auto;
  padding: 24px 28px;
  border-radius: 10px;
  background-color: var(--nx-surface);
  border: 1px solid var(--nx-border);
  border-left: 4px solid var(--nx-blue);
}
.nx-note-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--nx-navy);
  margin-bottom: 6px;
}
.nx-note p {
  font-size: 0.95rem;
  color: var(--nx-slate);
  line-height: 1.65;
}
@media (max-width: 820px) {
  .nx-grid-2,
  .nx-steps {
    grid-template-columns: 1fr;
  }
  .nx-price-card {
    padding: 28px 22px;
  }
  .nx-hero {
    padding: 72px 0 64px;
  }
  .nx-section {
    padding: 72px 0;
  }
}
`;

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const INCLUDED = [
  {
    title: 'A one-page AI policy',
    desc: 'Which AI tools your staff may use, what client information can and can’t go into them, and who to ask when unsure. Plain English, written for your office.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    title: 'Microsoft 365 permissions check',
    desc: 'We review sharing settings, groups and file access so an AI assistant can’t surface files people shouldn’t see, and fix what we find with your approval.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: 'One AI tool, set up safely',
    desc: 'Microsoft 365 Copilot Business, ChatGPT Business or Claude Team, set up with business accounts and data controls instead of personal logins.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    title: 'One-hour staff training',
    desc: 'A hands-on session on good uses, what to avoid and how to follow the policy, on site in Greater Lafayette or on a video call.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function ServicesPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const firm = form.firm.trim();
    const message = form.message.trim();
    if (!name || !email || !firm || !message) {
      setError('Please fill in your name, email, firm name and what you would like help with.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await sendContactEmail({
        name,
        email,
        organization: firm,
        phone: form.phone.trim(),
        message,
        source: 'Small business AI setup inquiry',
      });
      setSent(true);
    } catch (err) {
      console.error('Services inquiry error:', err);
      setError('Unable to send right now. Please email us directly at contact@nuvonixlabs.com.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nx-app">
      <style>{SITE_CSS + PAGE_CSS}</style>

      {/* Header */}
      <header className="nx-header">
        <div className="nx-container">
          <div className="nx-header-inner">
            <a href="../" className="nx-brand" aria-label="Nuvonix Labs home">
              <img src={logoMark} alt="Nuvonix Labs" className="nx-logo-img" />
              <span>Nuvonix Labs</span>
            </a>
            <div className="nx-nav-group">
              <nav className="nx-nav-links" aria-label="Primary navigation">
                <a href="../" className="nx-nav-link">Home</a>
                <a href="#included" className="nx-nav-link">What&rsquo;s Included</a>
                <a href="#pricing" className="nx-nav-link">Pricing</a>
              </nav>
              <a href="#contact" className="nx-btn-primary">Book a Call</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="nx-hero" id="hero">
        <div className="nx-container">
          <div className="nx-hero-content">
            <span className="nx-section-kicker">For small businesses in Indiana</span>
            <h1 className="nx-hero-title">Use AI at Your Firm Without Putting Client Data at Risk</h1>
            <p className="nx-hero-sub">
              A fixed-price setup for small accounting, bookkeeping and professional offices on Microsoft 365: a written AI policy, a permissions check, one AI tool set up safely, and staff training. Done in about two weeks.
            </p>
            <div className="nx-hero-actions">
              <a href="#contact" className="nx-btn-primary" style={{ padding: '13px 28px', fontSize: '0.96rem' }}>
                <span>Book a 15-Minute Call</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a href="#included" className="nx-btn-secondary" style={{ padding: '12px 26px', fontSize: '0.96rem' }}>
                See What&rsquo;s Included
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why now */}
      <section className="nx-section nx-section-surface" id="why">
        <div className="nx-container">
          <div className="nx-section-header">
            <span className="nx-section-kicker">Why now</span>
            <h2 className="nx-section-title">Your Team Is Already Using AI. The Rules Usually Come Later.</h2>
          </div>
          <div className="nx-grid-3">
            <div className="nx-card">
              <div className="nx-stat">95%</div>
              <p className="nx-card-desc">of accounting and bookkeeping firms are already using or exploring AI tools.</p>
            </div>
            <div className="nx-card">
              <div className="nx-stat">90%</div>
              <p className="nx-card-desc">have no written AI policy saying what client information can go into those tools.</p>
            </div>
            <div className="nx-card">
              <div className="nx-stat nx-stat-word">Permissions come first</div>
              <p className="nx-card-desc">AI assistants like Microsoft 365 Copilot can surface any file a person already has access to, so loose sharing settings get exposed fast.</p>
            </div>
          </div>
          <p className="nx-source">
            Figures: Financial Cents, <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer">State of AI in Accounting &amp; Bookkeeping 2026</a> (survey of 486 firms).
          </p>
        </div>
      </section>

      {/* What's included */}
      <section className="nx-section" id="included">
        <div className="nx-container">
          <div className="nx-section-header">
            <span className="nx-section-kicker">What&rsquo;s included</span>
            <h2 className="nx-section-title">AI Policy &amp; Secure Setup</h2>
            <p className="nx-section-sub">One fixed scope, delivered in about two weeks, mostly remotely.</p>
          </div>
          <div className="nx-grid-2">
            {INCLUDED.map((item) => (
              <div className="nx-card" key={item.title}>
                <div className="nx-card-icon">{item.icon}</div>
                <h3 className="nx-card-title">{item.title}</h3>
                <p className="nx-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="nx-test-note">
            Before anything goes live, we test the tool on a few of your real, non-sensitive tasks and show you the results, so you can see that it works for your office.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="nx-section nx-section-surface" id="how">
        <div className="nx-container">
          <div className="nx-section-header">
            <span className="nx-section-kicker">How it works</span>
            <h2 className="nx-section-title">Three Steps, No Surprises</h2>
          </div>
          <ol className="nx-steps">
            <li className="nx-step">
              <h3 className="nx-card-title">15-minute call</h3>
              <p className="nx-card-desc" style={{ marginTop: '8px' }}>
                We learn how your office works, which tools you use and what you want AI to help with. Free, no obligation.
              </p>
            </li>
            <li className="nx-step">
              <h3 className="nx-card-title">Setup, about two weeks</h3>
              <p className="nx-card-desc" style={{ marginTop: '8px' }}>
                Policy draft, permissions review and tool setup, with check-ins so nothing changes without your OK.
              </p>
            </li>
            <li className="nx-step">
              <h3 className="nx-card-title">Training and handover</h3>
              <p className="nx-card-desc" style={{ marginTop: '8px' }}>
                Staff training, a short written summary of what changed, and optional monthly support.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* Pricing */}
      <section className="nx-section" id="pricing">
        <div className="nx-container">
          <div className="nx-section-header">
            <span className="nx-section-kicker">Pricing</span>
            <h2 className="nx-section-title">One Fixed Price</h2>
          </div>
          <div className="nx-price-card">
            <div className="nx-price-name">AI Policy &amp; Secure Setup</div>
            <div className="nx-price-row">
              <span className="nx-price">$1,500</span>
              <span className="nx-price-unit">fixed price</span>
            </div>
            <div className="nx-offer">
              <strong>Founding-client offer:</strong> $750 for our first two client firms, in exchange for honest feedback we can share.
            </div>
            <ul className="nx-check-list">
              <li><CheckIcon /><span>One-page AI policy for your office</span></li>
              <li><CheckIcon /><span>Microsoft 365 permissions check and fixes, with your approval</span></li>
              <li><CheckIcon /><span>One AI tool set up with business accounts and data controls</span></li>
              <li><CheckIcon /><span>One-hour staff training, on site or by video</span></li>
              <li><CheckIcon /><span>A test on your own tasks before anything goes live</span></li>
            </ul>
            <a href="#contact" className="nx-btn-primary" style={{ width: '100%', padding: '13px', fontSize: '0.96rem' }}>
              Book a 15-Minute Call
            </a>
            <p className="nx-fine-print">
              Optional monthly support from $300/month: questions, new AI workflows and policy updates. Software subscriptions, such as Microsoft 365 or Copilot licenses, are billed by the vendor and are not included.
            </p>
          </div>
        </div>
      </section>

      {/* After setup + tax-data note */}
      <section className="nx-section" style={{ paddingTop: 0 }}>
        <div className="nx-container">
          <div className="nx-note" id="after-setup" style={{ marginBottom: 20 }}>
            <h3 className="nx-note-title">After setup: custom automations</h3>
            <p>
              Once your policy and tools are in place, we can build small automations for the repetitive work your team wants off its plate first, such as sorting client documents, drafting engagement letters or chasing missing paperwork. Each one is scoped and quoted separately, tested on your own tasks before it goes live, and offered to firms that have completed setup.
            </p>
          </div>
          <div className="nx-note">
            <h3 className="nx-note-title">A note for firms that prepare tax returns</h3>
            <p>
              Federal rules (IRC &sect;7216) can require a client&rsquo;s signed consent before tax return information is shared with an AI provider. Our policies keep tax return data out of AI tools unless your firm has that consent in place. We aren&rsquo;t attorneys or CPAs: we flag the question, and your firm and its advisers decide.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="nx-section nx-section-surface" id="contact">
        <div className="nx-container">
          <div className="nx-section-header">
            <span className="nx-section-kicker">Get started</span>
            <h2 className="nx-section-title">Book a 15-Minute Call</h2>
            <p className="nx-section-sub">
              Tell us a little about your office and we&rsquo;ll email you to find a time. Serving Greater Lafayette and Indianapolis, in person or remote. Prefer email? Write to{' '}
              <a href="mailto:contact@nuvonixlabs.com" style={{ color: 'var(--nx-blue)', textDecoration: 'underline', fontWeight: 600 }}>contact@nuvonixlabs.com</a>.
            </p>
          </div>

          <div className="nx-contact-card">
            {sent ? (
              <div className="nx-success-box">
                <h3 className="nx-success-title">Request Received</h3>
                <p className="nx-success-desc">
                  Thanks, <strong>{form.name}</strong>. We&rsquo;ll email you at <strong>{form.email}</strong> to set up a time.
                </p>
                <button
                  type="button"
                  className="nx-btn-primary"
                  onClick={() => {
                    setSent(false);
                    setForm(EMPTY_FORM);
                  }}
                >
                  Send Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="nx-form">
                <div className="nx-form-group">
                  <label htmlFor="s-name" className="nx-label">Your Name</label>
                  <input id="s-name" type="text" required className="nx-input" placeholder="e.g. Jordan Miller"
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="nx-form-group">
                  <label htmlFor="s-email" className="nx-label">Email</label>
                  <input id="s-email" type="email" required className="nx-input" placeholder="name@yourfirm.com"
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="nx-form-group">
                  <label htmlFor="s-firm" className="nx-label">Firm Name</label>
                  <input id="s-firm" type="text" required className="nx-input" placeholder="e.g. Miller Bookkeeping"
                    value={form.firm} onChange={(e) => setForm({ ...form, firm: e.target.value })} />
                </div>
                <div className="nx-form-group">
                  <label htmlFor="s-phone" className="nx-label">Phone (Optional)</label>
                  <input id="s-phone" type="tel" className="nx-input" placeholder="(765) 555-0123"
                    value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="nx-form-group">
                  <label htmlFor="s-msg" className="nx-label">What Would You Like Help With?</label>
                  <textarea id="s-msg" required rows={4} className="nx-textarea" style={{ resize: 'vertical' }}
                    placeholder="e.g. We have 8 staff on Microsoft 365 and want to start using Copilot safely."
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>
                {error && (
                  <div role="alert" style={{ padding: '10px 14px', borderRadius: '6px', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', fontSize: '0.85rem' }}>
                    {error}
                  </div>
                )}
                <button type="submit" className="nx-btn-primary" style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }} disabled={loading}>
                  {loading ? 'Sending...' : 'Request a Call'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="nx-footer">
        <div className="nx-container">
          <div className="nx-footer-inner">
            <a href="../" style={{ display: 'flex', alignItems: 'center', gap: '10px' }} aria-label="Nuvonix Labs home">
              <img src={logoMark} alt="Nuvonix Labs" className="nx-footer-logo-img" />
              <strong style={{ color: 'var(--nx-navy)', fontSize: '1.05rem', letterSpacing: '-0.02em' }}>Nuvonix Labs</strong>
            </a>
            <nav className="nx-footer-links" aria-label="Footer navigation">
              <a href="../" className="nx-footer-link">Home</a>
              <a href="#included" className="nx-footer-link">What&rsquo;s Included</a>
              <a href="#pricing" className="nx-footer-link">Pricing</a>
              <a href="#contact" className="nx-footer-link">Book a Call</a>
            </nav>
          </div>
          <div className="nx-footer-bottom">
            <span>&copy; 2026 Nuvonix LLC. All rights reserved.</span>
            <span>Direct Email: <a href="mailto:contact@nuvonixlabs.com" style={{ color: 'var(--nx-navy)', fontWeight: 600, textDecoration: 'underline' }}>contact@nuvonixlabs.com</a></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
