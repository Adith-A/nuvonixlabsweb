// Shared stylesheet for every page of nuvonixlabs.com (home and /services/).
// Moved out of App.tsx unchanged so both pages look the same.
export const SITE_CSS = `
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
  width: auto;
  height: 34px;
  object-fit: contain;
  flex-shrink: 0;
  display: block;
  image-rendering: -webkit-optimize-contrast;
}

.nx-footer-logo-img {
  width: auto;
  height: 26px;
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
`;
