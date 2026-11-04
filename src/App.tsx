import React, { useState, useEffect } from 'react';
import { submitContactMessage } from './lib/firestoreService';

export default function App() {
  // Contact Modal State
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState<'terms' | 'privacy' | null>(null);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);

  // Keyboard accessibility: ESC key closes open modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setContactModalOpen(false);
        setLegalModalOpen(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle Contact Form Submission (writes to Firestore inquiries collection)
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = contactForm.name.trim();
    const trimmedEmail = contactForm.email.trim();
    const trimmedMsg = contactForm.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMsg) {
      setContactError('Please complete name, email, and message fields.');
      return;
    }

    setContactError(null);
    setContactLoading(true);

    try {
      await submitContactMessage({
        name: trimmedName,
        email: trimmedEmail,
        organization: contactForm.organization.trim(),
        message: trimmedMsg,
      });
      setContactSuccess(true);
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setContactError('Unable to send message right now. Please email us directly at contact@nuvonixlabs.com.');
    } finally {
      setContactLoading(false);
    }
  };

  const openContact = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setContactSuccess(false);
    setContactError(null);
    setContactModalOpen(true);
  };

  return (
    <div className="nx-app">
      {/* =========================================================================
          FLUID, ULTRA-SMOOTH LIGHT-MODE STYLESHEET
         ========================================================================= */}
      <style>{`
        :root {
          --nx-font: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          --nx-font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          --nx-white: #FFFFFF;
          --nx-bg: #FFFFFF;
          --nx-surface: #F8FAFC;
          --nx-surface-subtle: #F1F5F9;
          --nx-navy: #001F3F;
          --nx-navy-hover: #00152B;
          --nx-navy-light: #022E5C;
          --nx-slate-dark: #0F172A;
          --nx-slate: #334155;
          --nx-slate-light: #64748B;
          --nx-border: #E2E8F0;
          --nx-border-hover: #CBD5E1;
          --nx-blue: #0284C7;
          --nx-blue-hover: #0369A1;
          --nx-green: #10B981;
          --nx-shadow-sm: 0 1px 2px rgba(0, 31, 63, 0.04);
          --nx-shadow-md: 0 4px 14px rgba(0, 31, 63, 0.05), 0 1px 3px rgba(0, 31, 63, 0.03);
          --nx-shadow-lg: 0 12px 32px -4px rgba(0, 31, 63, 0.08), 0 4px 12px -2px rgba(0, 31, 63, 0.03);
          --nx-ease: cubic-bezier(0.16, 1, 0.3, 1);
        }

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
          text-size-adjust: 100%;
          font-feature-settings: "cv02", "cv03", "cv04", "cv11";
        }

        body {
          font-family: var(--nx-font);
          color: var(--nx-slate-dark);
          background-color: var(--nx-bg);
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-x: hidden;
          letter-spacing: -0.011em;
        }

        a {
          color: inherit;
          text-decoration: none;
          transition: color 0.2s var(--nx-ease);
        }

        button, input, select, textarea {
          font-family: inherit;
        }

        :focus-visible {
          outline: 2px solid var(--nx-blue);
          outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }

        .nx-container {
          width: 100%;
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* -------------------------------------------------------------------------
           1. STICKY HEADER (HIGH-CLASS & REFINED)
           ------------------------------------------------------------------------- */
        .nx-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background-color: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(226, 232, 240, 0.9);
          transition: border-color 0.2s var(--nx-ease), box-shadow 0.2s var(--nx-ease);
        }

        .nx-header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 76px;
        }

        .nx-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--nx-navy);
          letter-spacing: -0.025em;
          transition: opacity 0.2s var(--nx-ease);
          text-decoration: none;
        }

        .nx-brand:hover {
          opacity: 0.9;
        }

        .nx-logo-img {
          width: 36px;
          height: 36px;
          object-fit: contain;
          flex-shrink: 0;
          display: block;
          image-rendering: -webkit-optimize-contrast;
        }

        .nx-footer-logo-img {
          width: 28px;
          height: 28px;
          object-fit: contain;
          flex-shrink: 0;
          display: block;
          image-rendering: -webkit-optimize-contrast;
        }

        .nx-nav-group {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .nx-nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .nx-nav-link {
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--nx-slate);
          letter-spacing: -0.01em;
          transition: color 0.2s var(--nx-ease);
        }

        .nx-nav-link:hover {
          color: var(--nx-navy);
        }

        /* High-class buttons */
        .nx-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          background-color: var(--nx-navy);
          color: #ffffff;
          padding: 10px 22px;
          border-radius: 8px;
          font-size: 0.92rem;
          font-weight: 700;
          letter-spacing: -0.015em;
          border: 1px solid rgba(0, 31, 63, 0.1);
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0, 31, 63, 0.08), 0 1px 2px rgba(0, 31, 63, 0.04);
          transition: all 0.2s var(--nx-ease);
        }

        .nx-btn-primary:hover {
          background-color: var(--nx-navy-light);
          transform: translateY(-1.5px);
          box-shadow: 0 6px 16px -2px rgba(0, 31, 63, 0.16);
          color: #ffffff;
        }

        .nx-btn-primary:active {
          transform: translateY(0);
        }

        .nx-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          background-color: #ffffff;
          color: var(--nx-navy);
          border: 1.5px solid var(--nx-border);
          padding: 10px 22px;
          border-radius: 8px;
          font-size: 0.92rem;
          font-weight: 700;
          letter-spacing: -0.015em;
          cursor: pointer;
          transition: all 0.2s var(--nx-ease);
        }

        .nx-btn-secondary:hover {
          border-color: var(--nx-navy);
          background-color: var(--nx-surface);
          transform: translateY(-1.5px);
          box-shadow: var(--nx-shadow-sm);
        }

        .nx-btn-secondary:active {
          transform: translateY(0);
        }

        /* -------------------------------------------------------------------------
           2. HERO SECTION (ENGINEERING SUBTLETY & COMMANDING TYPOGRAPHY)
           ------------------------------------------------------------------------- */
        .nx-hero {
          position: relative;
          padding: 104px 0 92px;
          text-align: center;
          background-color: #ffffff;
          background-image: 
            radial-gradient(ellipse 70% 50% at 50% -12%, rgba(2, 132, 199, 0.09), transparent 70%),
            linear-gradient(to right, rgba(0, 31, 63, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 31, 63, 0.02) 1px, transparent 1px);
          background-size: 100% 100%, 48px 48px, 48px 48px;
          border-bottom: 1px solid var(--nx-border);
          overflow: hidden;
        }

        .nx-hero-content {
          max-width: 860px;
          margin: 0 auto;
        }

        .nx-hero-title {
          font-size: clamp(2.35rem, 4.4vw, 3.45rem);
          line-height: 1.15;
          font-weight: 800;
          color: var(--nx-navy);
          letter-spacing: -0.04em;
          margin-bottom: 22px;
          font-feature-settings: "cv02", "cv03", "cv04";
        }

        .nx-hero-sub {
          font-size: clamp(1.08rem, 1.8vw, 1.25rem);
          line-height: 1.65;
          color: var(--nx-slate);
          max-width: 720px;
          margin: 0 auto 36px;
          font-weight: 400;
          letter-spacing: -0.01em;
        }

        .nx-hero-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        /* -------------------------------------------------------------------------
           3. THREE PILLARS SECTION (FLUID CARDS & SUBTLE HOVER ELEVATION)
           ------------------------------------------------------------------------- */
        .nx-section {
          padding: 96px 0;
        }

        .nx-section-surface {
          background-color: var(--nx-surface);
          border-top: 1px solid var(--nx-border);
          border-bottom: 1px solid var(--nx-border);
        }

        .nx-section-header {
          text-align: center;
          max-width: 660px;
          margin: 0 auto 56px;
        }

        .nx-section-kicker {
          font-size: 0.78rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          color: var(--nx-blue);
          margin-bottom: 10px;
          display: block;
        }

        .nx-section-title {
          font-size: clamp(1.9rem, 3.2vw, 2.45rem);
          font-weight: 800;
          color: var(--nx-navy);
          letter-spacing: -0.03em;
          margin-bottom: 16px;
          line-height: 1.22;
        }

        .nx-section-sub {
          font-size: 1.05rem;
          color: var(--nx-slate);
          line-height: 1.65;
          letter-spacing: -0.01em;
        }

        .nx-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .nx-card {
          background-color: var(--nx-white);
          border: 1px solid var(--nx-border);
          border-radius: 12px;
          padding: 34px 30px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          box-shadow: 0 1px 3px rgba(0, 31, 63, 0.03);
          transition: transform 0.25s var(--nx-ease), box-shadow 0.25s var(--nx-ease), border-color 0.25s var(--nx-ease);
        }

        .nx-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px -4px rgba(0, 31, 63, 0.06);
          border-color: var(--nx-border-hover);
        }

        .nx-card-icon {
          width: 46px;
          height: 46px;
          border-radius: 10px;
          background-color: #F0F7FF;
          color: var(--nx-blue);
          border: 1px solid #DCEBFA;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 6px;
        }

        .nx-card-title {
          font-size: 1.22rem;
          font-weight: 800;
          color: var(--nx-navy);
          letter-spacing: -0.02em;
        }

        .nx-card-desc {
          font-size: 0.95rem;
          color: var(--nx-slate);
          line-height: 1.65;
        }

        /* -------------------------------------------------------------------------
           4. GITHUB REPOSITORY BANNER & CODE TERMINAL (TECHNICAL PRESTIGE)
           ------------------------------------------------------------------------- */
        .nx-banner {
          background-color: #ffffff;
          border: 1px solid var(--nx-border);
          border-radius: 14px;
          padding: 38px 42px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 28px;
          box-shadow: 0 2px 8px rgba(0, 31, 63, 0.04);
          transition: border-color 0.25s var(--nx-ease), box-shadow 0.25s var(--nx-ease);
        }

        .nx-banner:hover {
          border-color: var(--nx-border-hover);
          box-shadow: 0 8px 24px -4px rgba(0, 31, 63, 0.07);
        }

        .nx-banner-content {
          max-width: 660px;
        }

        .nx-banner-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--nx-navy);
          letter-spacing: -0.025em;
          margin-bottom: 8px;
        }

        .nx-banner-desc {
          font-size: 0.97rem;
          color: var(--nx-slate);
          line-height: 1.6;
        }

        .nx-terminal-box {
          margin-top: 36px;
          background-color: #0F172A;
          border-radius: 12px;
          border: 1px solid #1E293B;
          box-shadow: 0 8px 28px -4px rgba(15, 23, 42, 0.25);
          overflow: hidden;
          text-align: left;
        }

        .nx-terminal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          background-color: #0A0F1D;
          border-bottom: 1px solid #1E293B;
        }

        .nx-terminal-dots {
          display: flex;
          gap: 7px;
        }

        .nx-terminal-dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
        }

        .nx-terminal-code {
          padding: 20px 24px;
          font-family: var(--nx-font-mono);
          font-size: 0.88rem;
          line-height: 1.7;
          color: #E2E8F0;
          overflow-x: auto;
        }

        .nx-code-dim {
          color: #64748B;
        }

        .nx-code-cyan {
          color: #38BDF8;
        }

        .nx-code-green {
          color: #4ADE80;
        }

        /* -------------------------------------------------------------------------
           5. WORKING IN-PAGE CONTACT SECTION
           ------------------------------------------------------------------------- */
        .nx-contact-card {
          max-width: 540px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 36px;
          border-radius: 12px;
          border: 1px solid var(--nx-border);
          box-shadow: var(--nx-shadow-md);
        }

        .nx-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .nx-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-align: left;
        }

        .nx-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--nx-navy);
        }

        .nx-input, .nx-textarea {
          width: 100%;
          padding: 11px 15px;
          border: 1.5px solid var(--nx-border);
          border-radius: 6px;
          font-size: 0.92rem;
          color: var(--nx-navy);
          background-color: #ffffff;
          outline: none;
          font-family: inherit;
          transition: border-color 0.2s var(--nx-ease), box-shadow 0.2s var(--nx-ease);
        }

        .nx-input:focus, .nx-textarea:focus {
          border-color: var(--nx-navy);
          box-shadow: 0 0 0 3px rgba(0, 31, 63, 0.08);
        }

        .nx-success-box {
          text-align: center;
          padding: 28px 24px;
          background-color: #ECFDF5;
          border: 1px solid #A7F3D0;
          border-radius: 10px;
          color: #065F46;
        }

        .nx-success-title {
          font-size: 1.15rem;
          font-weight: 800;
          margin-bottom: 6px;
        }

        .nx-success-desc {
          font-size: 0.9rem;
          line-height: 1.55;
          margin-bottom: 18px;
        }

        /* -------------------------------------------------------------------------
           6. MODAL DIALOGS (CONTACT & LEGAL)
           ------------------------------------------------------------------------- */
        .nx-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
          background-color: rgba(0, 31, 63, 0.65);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: nxFadeIn 0.2s var(--nx-ease);
        }

        @keyframes nxFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .nx-modal-dialog {
          background-color: #ffffff;
          border-radius: 12px;
          width: 100%;
          max-width: 480px;
          box-shadow: var(--nx-shadow-lg);
          overflow: hidden;
          animation: nxSlideUp 0.25s var(--nx-ease);
        }

        @keyframes nxSlideUp {
          from { transform: translateY(14px) scale(0.98); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .nx-modal-header {
          padding: 18px 24px;
          border-bottom: 1px solid var(--nx-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: var(--nx-surface);
        }

        .nx-modal-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--nx-navy);
        }

        .nx-modal-close {
          background: none;
          border: none;
          font-size: 1.5rem;
          line-height: 1;
          color: var(--nx-slate-light);
          cursor: pointer;
          transition: color 0.15s var(--nx-ease);
        }

        .nx-modal-close:hover {
          color: var(--nx-navy);
        }

        .nx-modal-body {
          padding: 24px;
        }

        /* -------------------------------------------------------------------------
           7. FOOTER
           ------------------------------------------------------------------------- */
        .nx-footer {
          padding: 48px 0 32px;
          background-color: #ffffff;
          border-top: 1px solid var(--nx-border);
        }

        .nx-footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--nx-border);
        }

        .nx-footer-links {
          display: flex;
          align-items: center;
          gap: 28px;
          flex-wrap: wrap;
        }

        .nx-footer-link {
          font-size: 0.9rem;
          color: var(--nx-slate);
          font-weight: 600;
          cursor: pointer;
          background: none;
          border: none;
          transition: color 0.2s var(--nx-ease);
        }

        .nx-footer-link:hover {
          color: var(--nx-navy);
        }

        .nx-footer-bottom {
          padding-top: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--nx-slate-light);
        }

        @media (max-width: 820px) {
          .nx-grid-3 {
            grid-template-columns: 1fr;
          }
          .nx-nav-links {
            display: none;
          }
          .nx-banner {
            padding: 28px;
          }
        }
      `}</style>

      {/* =========================================================================
          1. HEADER (CLEAN STICKY NAV)
         ========================================================================= */}
      <header className="nx-header">
        <div className="nx-container">
          <div className="nx-header-inner">
            {/* Logo */}
            <a href={import.meta.env.BASE_URL} className="nx-brand" aria-label="Nuvonix Labs Home">
              <img
                src={`${import.meta.env.BASE_URL}image.png`}
                alt="Nuvonix Labs"
                className="nx-logo-img"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.endsWith('image.png')) {
                    target.src = `${import.meta.env.BASE_URL}image.png`;
                  }
                }}
              />
              <span>Nuvonix Labs</span>
            </a>

            {/* Navigation links & Functional Contact Us Button */}
            <div className="nx-nav-group">
              <nav className="nx-nav-links" aria-label="Primary navigation">
                <a href="#overview" className="nx-nav-link">What We Build</a>
                <a
                  href="https://github.com/Adith-A/nuvonix-accounting-eval-sample"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nx-nav-link"
                >
                  GitHub Sample
                </a>
              </nav>

              {/* Working Contact Us CTA */}
              <button
                type="button"
                className="nx-btn-primary"
                onClick={openContact}
                aria-label="Contact Nuvonix Labs"
              >
                <span>Contact Us</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. HERO SECTION (NO FAKE BUBBLE / GROUNDED COPY)
         ========================================================================= */}
      <section className="nx-hero" id="hero">
        <div className="nx-container">
          <div className="nx-hero-content">
            <h1 className="nx-hero-title">
              Expert-Written Finance &amp; Accounting Tasks for Frontier AI
            </h1>

            <p className="nx-hero-sub">
              Nuvonix Labs builds expert-written finance and accounting tasks with answer keys and grading rubrics, for teams training and evaluating AI. We're taking early projects now.
            </p>

            <div className="nx-hero-actions">
              {/* Primary Contact Us Button */}
              <button
                type="button"
                className="nx-btn-primary"
                style={{ padding: '13px 28px', fontSize: '0.96rem' }}
                onClick={openContact}
              >
                <span>Contact Us</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              {/* GitHub Link */}
              <a
                href="https://github.com/Adith-A/nuvonix-accounting-eval-sample"
                target="_blank"
                rel="noopener noreferrer"
                className="nx-btn-secondary"
                style={{ padding: '12px 26px', fontSize: '0.96rem' }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>View GitHub Sample</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. WHAT WE BUILD (THREE CORE PILLARS)
         ========================================================================= */}
      <section className="nx-section nx-section-surface" id="overview">
        <div className="nx-container">
          <div className="nx-section-header">
            <span className="nx-section-kicker">Core Deliverables</span>
            <h2 className="nx-section-title">Rigorous Evaluation for High-Stakes Finance</h2>
            <p className="nx-section-sub">
              Generalist benchmarks fail to catch domain nuances in accounting standards and financial calculations. We develop deterministic tasks with complete verification keys.
            </p>
          </div>

          <div className="nx-grid-3">
            {/* Pillar 1 */}
            <div className="nx-card">
              <div className="nx-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <h3 className="nx-card-title">Practitioner-Authored Tasks</h3>
              <p className="nx-card-desc">
                Realistic business scenarios authored by accounting and corporate finance professionals, reflecting real-world corporate ledgers and technical codifications.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="nx-card">
              <div className="nx-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="nx-card-title">Deterministic Answer Keys</h3>
              <p className="nx-card-desc">
                Step-by-step mathematical derivations and exact codification citations so model evaluations are graded against verified ground truth rather than guesswork.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="nx-card">
              <div className="nx-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <h3 className="nx-card-title">Clear Grading Rubrics</h3>
              <p className="nx-card-desc">
                Deterministic scoring criteria and deduction guidelines formatted for automated model scoring harnesses or expert human evaluation workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. PUBLIC BENCHMARK GITHUB BANNER & TERMINAL VERIFIER
         ========================================================================= */}
      <section className="nx-section">
        <div className="nx-container">
          <div className="nx-banner">
            <div className="nx-banner-content">
              <h3 className="nx-banner-title">Inspect Our Public Accounting Evaluation Sample</h3>
              <p className="nx-banner-desc">
                We make evaluation reference samples publicly inspectable. Review our multi-file accounting data structures, integer-cent verification code, and sample test cases directly on GitHub.
              </p>
            </div>
            <a
              href="https://github.com/Adith-A/nuvonix-accounting-eval-sample"
              target="_blank"
              rel="noopener noreferrer"
              className="nx-btn-primary"
            >
              <span>Explore on GitHub</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17l9.2-9.2M17 17V8H8" />
              </svg>
            </a>
          </div>

          {/* Clean Light-Mode Terminal Block for High Technical Polish */}
          <div className="nx-terminal-box">
            <div className="nx-terminal-header">
              <div className="nx-terminal-dots">
                <span className="nx-terminal-dot" style={{ backgroundColor: '#EF4444' }} />
                <span className="nx-terminal-dot" style={{ backgroundColor: '#F59E0B' }} />
                <span className="nx-terminal-dot" style={{ backgroundColor: '#10B981' }} />
              </div>
              <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontFamily: 'var(--nx-font-mono)' }}>
                bash &mdash; nuvonix-eval-sample
              </span>
            </div>
            <div className="nx-terminal-code">
              <div><span className="nx-code-dim">$</span> git clone https://github.com/Adith-A/nuvonix-accounting-eval-sample.git</div>
              <div><span className="nx-code-dim">$</span> cd nuvonix-accounting-eval-sample</div>
              <div><span className="nx-code-dim">$</span> python3 verify.py submissions/gold_pass_submission.json</div>
              <div style={{ marginTop: '8px' }}><span className="nx-code-cyan">[INFO]</span> Loading task manifest: <span className="nx-code-green">NUV-DE-102</span> (Multi-Entity Stripe Payout Reconciler)</div>
              <div><span className="nx-code-cyan">[PASS]</span> Integer-cent arithmetic balance check: zero variance ($0.00)</div>
              <div><span className="nx-code-cyan">[PASS]</span> ASC 606 revenue deferral &amp; realization timeline satisfied</div>
              <div><span className="nx-code-green">&gt;&gt; VERIFICATION SUCCESS: 100.0% ground-truth invariant match (Exit Code 0)</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. WORKING CONTACT US SECTION (FUNCTIONAL & PERSISTENT)
         ========================================================================= */}
      <section className="nx-section nx-section-surface" id="contact">
        <div className="nx-container">
          <div className="nx-section-header">
            <span className="nx-section-kicker">Get in Touch</span>
            <h2 className="nx-section-title">Contact Us</h2>
            <p className="nx-section-sub">
              Have an evaluation benchmark need or want to discuss an early project? Send us a note below or reach us directly at <a href="mailto:contact@nuvonixlabs.com" style={{ color: 'var(--nx-blue)', textDecoration: 'underline', fontWeight: 600 }}>contact@nuvonixlabs.com</a>.
            </p>
          </div>

          <div className="nx-contact-card">
            {contactSuccess ? (
              <div className="nx-success-box">
                <h3 className="nx-success-title">Message Received</h3>
                <p className="nx-success-desc">
                  Thank you, <strong>{contactForm.name}</strong>. Your message has been sent to the Nuvonix Labs team. We will reply to <strong>{contactForm.email}</strong> shortly.
                </p>
                <button
                  type="button"
                  className="nx-btn-primary"
                  onClick={() => {
                    setContactSuccess(false);
                    setContactForm({ name: '', email: '', organization: '', message: '' });
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="nx-form">
                <div className="nx-form-group">
                  <label htmlFor="contact-name" className="nx-label">Your Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="nx-input"
                  />
                </div>

                <div className="nx-form-group">
                  <label htmlFor="contact-email" className="nx-label">Work Email</label>
                  <input
                    type="email"
                    id="contact-email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="name@company.com"
                    className="nx-input"
                  />
                </div>

                <div className="nx-form-group">
                  <label htmlFor="contact-org" className="nx-label">Organization / AI Lab (Optional)</label>
                  <input
                    type="text"
                    id="contact-org"
                    value={contactForm.organization}
                    onChange={(e) => setContactForm({ ...contactForm, organization: e.target.value })}
                    placeholder="e.g. Enterprise AI Team"
                    className="nx-input"
                  />
                </div>

                <div className="nx-form-group">
                  <label htmlFor="contact-message" className="nx-label">Message / Project Details</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Tell us what finance or accounting evaluation scope you're looking for..."
                    className="nx-textarea"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                {contactError && (
                  <div style={{ padding: '10px 14px', borderRadius: '6px', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', fontSize: '0.85rem' }}>
                    {contactError}
                  </div>
                )}

                <button
                  type="submit"
                  className="nx-btn-primary"
                  style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }}
                  disabled={contactLoading}
                >
                  {contactLoading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. FOOTER
         ========================================================================= */}
      <footer className="nx-footer">
        <div className="nx-container">
          <div className="nx-footer-inner">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src={`${import.meta.env.BASE_URL}image.png`} alt="Nuvonix Labs" className="nx-footer-logo-img" />
              <strong style={{ color: 'var(--nx-navy)', fontSize: '1.05rem', letterSpacing: '-0.02em' }}>Nuvonix Labs</strong>
            </div>

            <nav className="nx-footer-links" aria-label="Footer Navigation">
              <button
                type="button"
                className="nx-footer-link"
                onClick={openContact}
              >
                Contact Us
              </button>
              <a
                href="https://github.com/Adith-A/nuvonix-accounting-eval-sample"
                target="_blank"
                rel="noopener noreferrer"
                className="nx-footer-link"
              >
                GitHub Sample
              </a>
              <button
                type="button"
                className="nx-footer-link"
                onClick={() => setLegalModalOpen('terms')}
              >
                Terms of Service
              </button>
              <button
                type="button"
                className="nx-footer-link"
                onClick={() => setLegalModalOpen('privacy')}
              >
                Privacy Policy
              </button>
            </nav>
          </div>

          <div className="nx-footer-bottom">
            <span>&copy; 2026 Nuvonix LLC. All rights reserved.</span>
            <span>Direct Email: <a href="mailto:contact@nuvonixlabs.com" style={{ color: 'var(--nx-navy)', fontWeight: 600, textDecoration: 'underline' }}>contact@nuvonixlabs.com</a></span>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          MODAL: CONTACT US DIALOG
         ========================================================================= */}
      {contactModalOpen && (
        <div
          className="nx-modal-overlay"
          onClick={() => setContactModalOpen(false)}
          role="presentation"
        >
          <div
            className="nx-modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="nx-modal-header">
              <h3 id="contact-modal-title" className="nx-modal-title">Contact Nuvonix Labs</h3>
              <button
                type="button"
                className="nx-modal-close"
                onClick={() => setContactModalOpen(false)}
                aria-label="Close contact modal"
              >
                &times;
              </button>
            </div>
            <div className="nx-modal-body">
              {contactSuccess ? (
                <div className="nx-success-box">
                  <h4 className="nx-success-title">Message Received</h4>
                  <p className="nx-success-desc">
                    Thank you, <strong>{contactForm.name}</strong>. Your inquiry has been sent to our team. We will get back to you at <strong>{contactForm.email}</strong> shortly.
                  </p>
                  <button
                    type="button"
                    className="nx-btn-primary"
                    style={{ width: '100%' }}
                    onClick={() => {
                      setContactModalOpen(false);
                      setContactSuccess(false);
                      setContactForm({ name: '', email: '', organization: '', message: '' });
                    }}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="nx-form">
                  <div className="nx-form-group">
                    <label htmlFor="m-name" className="nx-label">Your Name</label>
                    <input
                      type="text"
                      id="m-name"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Rachel Sterling"
                      className="nx-input"
                    />
                  </div>

                  <div className="nx-form-group">
                    <label htmlFor="m-email" className="nx-label">Work Email</label>
                    <input
                      type="email"
                      id="m-email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="name@company.com"
                      className="nx-input"
                    />
                  </div>

                  <div className="nx-form-group">
                    <label htmlFor="m-org" className="nx-label">Organization / Lab (Optional)</label>
                    <input
                      type="text"
                      id="m-org"
                      value={contactForm.organization}
                      onChange={(e) => setContactForm({ ...contactForm, organization: e.target.value })}
                      placeholder="e.g. AI Evaluation Team"
                      className="nx-input"
                    />
                  </div>

                  <div className="nx-form-group">
                    <label htmlFor="m-msg" className="nx-label">Message</label>
                    <textarea
                      id="m-msg"
                      required
                      rows={3}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="How can we help with your finance & accounting evaluation requirements?"
                      className="nx-textarea"
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  {contactError && (
                    <div style={{ padding: '8px 12px', borderRadius: '6px', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', fontSize: '0.825rem' }}>
                      {contactError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="nx-btn-primary"
                    style={{ width: '100%' }}
                    disabled={contactLoading}
                  >
                    {contactLoading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: LEGAL TERMS & PRIVACY
         ========================================================================= */}
      {legalModalOpen && (
        <div
          className="nx-modal-overlay"
          onClick={() => setLegalModalOpen(null)}
          role="presentation"
        >
          <div
            className="nx-modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="nx-modal-header">
              <h3 id="legal-modal-title" className="nx-modal-title">
                {legalModalOpen === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
              </h3>
              <button
                type="button"
                className="nx-modal-close"
                onClick={() => setLegalModalOpen(null)}
                aria-label="Close legal modal"
              >
                &times;
              </button>
            </div>
            <div className="nx-modal-body" style={{ fontSize: '0.875rem', color: 'var(--nx-slate)', lineHeight: 1.6 }}>
              {legalModalOpen === 'terms' ? (
                <div>
                  <h4 style={{ color: 'var(--nx-navy)', marginBottom: '8px', fontWeight: 700 }}>Task Deliverables &amp; Licensing</h4>
                  <p style={{ marginBottom: '12px' }}>
                    All finance and accounting tasks, deterministic answer keys, and grading rubrics created under client agreements are delivered under standard commercial licenses as defined in individual statements of work.
                  </p>
                  <p>
                    All evaluation task suites undergo statutory accuracy checks against relevant GAAP/IFRS standards.
                  </p>
                </div>
              ) : (
                <div>
                  <h4 style={{ color: 'var(--nx-navy)', marginBottom: '8px', fontWeight: 700 }}>Confidentiality &amp; Data Isolation</h4>
                  <p style={{ marginBottom: '12px' }}>
                    Nuvonix LLC protects client project details and evaluation specifications under commercial confidentiality protocols. Inquiries and evaluation requests are not shared with third parties.
                  </p>
                  <p>
                    Contact submissions are strictly used to coordinate evaluation task scopes and communicate project updates.
                  </p>
                </div>
              )}
              <button
                type="button"
                className="nx-btn-primary"
                style={{ width: '100%', marginTop: '20px' }}
                onClick={() => setLegalModalOpen(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
