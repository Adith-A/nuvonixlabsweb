/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { X, Send, CheckCircle2, Database, Shield, Layers } from 'lucide-react';

interface PilotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PilotModal: React.FC<PilotModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [domain, setDomain] = useState('asc606');
  const [sampleSize, setSampleSize] = useState('1000');
  const [deliveryFormat, setDeliveryFormat] = useState('parquet');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setError('');
      setTimeout(() => {
        emailInputRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid enterprise email address.');
      emailInputRef.current?.focus();
      return;
    }
    if (!company.trim()) {
      setError('Please provide your organization name.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pilot-modal-title"
        aria-describedby="pilot-modal-desc"
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0088FF]">
              <Database className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h2 id="pilot-modal-title" className="text-lg font-bold text-[#001F3F]">
                Request a Pilot Dataset
              </h2>
              <p id="pilot-modal-desc" className="text-xs text-slate-500">
                Audit-ready reasoning trajectories for enterprise frontier evaluation
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close pilot request modal"
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-[#0088FF] focus-visible:outline-none"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-[#001F3F]">Pilot Specification Received</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Our Frontier Data Engineering team has provisioned your sample request for{' '}
              <span className="font-semibold text-slate-800">{company}</span>. A secure transfer link
              and mutual confidentiality agreement have been dispatched to{' '}
              <span className="font-semibold text-slate-800">{email}</span>.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close confirmation dialog"
                className="w-full py-2.5 px-4 bg-[#0088FF] text-white font-semibold text-sm rounded-xl hover:bg-[#0077e6] transition-colors focus-visible:ring-2 focus-visible:ring-[#0088FF] focus-visible:outline-none"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4" noValidate>
            {error && (
              <div
                role="alert"
                aria-live="polite"
                className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl font-medium"
              >
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="pilot-email"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1"
                >
                  Work Email
                </label>
                <input
                  ref={emailInputRef}
                  id="pilot-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@organization.com"
                  aria-label="Enterprise Work Email"
                  required
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-[#0088FF] focus:ring-2 focus:ring-[#0088FF]/20 focus-visible:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="pilot-company"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1"
                >
                  Organization Name
                </label>
                <input
                  id="pilot-company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Frontier AI Labs Inc."
                  aria-label="Organization or AI Lab Name"
                  required
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-[#0088FF] focus:ring-2 focus:ring-[#0088FF]/20 focus-visible:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="pilot-domain"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1"
              >
                Target Domain &amp; Statutory Focus
              </label>
              <select
                id="pilot-domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                aria-label="Select target reasoning domain"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-[#0088FF] focus:ring-2 focus:ring-[#0088FF]/20 focus-visible:outline-none"
              >
                <option value="asc606">ASC 606 Revenue Recognition (Multi-Element Software/SaaS)</option>
                <option value="delaware_ma">Delaware Corporate Law: M&amp;A MAE &amp; Indemnity Escrows</option>
                <option value="asc842">ASC 842 Commercial Lease &amp; Asset Impairment Trajectories</option>
                <option value="tax_740">ASC 740 Corporate Income Tax Valuation Allowances</option>
                <option value="custom">Custom Frontier Reasoning Benchmark Suite</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="pilot-size"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1"
                >
                  Pilot Batch Size
                </label>
                <select
                  id="pilot-size"
                  value={sampleSize}
                  onChange={(e) => setSampleSize(e.target.value)}
                  aria-label="Select pilot batch size"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-[#0088FF] focus:ring-2 focus:ring-[#0088FF]/20 focus-visible:outline-none"
                >
                  <option value="500">500 Gold Trajectories</option>
                  <option value="1000">1,000 Gold Trajectories</option>
                  <option value="5000">5,000 SFT &amp; RLHF Traces</option>
                  <option value="full">Enterprise Custom Cohort</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="pilot-format"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1"
                >
                  Delivery Format
                </label>
                <select
                  id="pilot-format"
                  value={deliveryFormat}
                  onChange={(e) => setDeliveryFormat(e.target.value)}
                  aria-label="Select dataset delivery format"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-[#0088FF] focus:ring-2 focus:ring-[#0088FF]/20 focus-visible:outline-none"
                >
                  <option value="parquet">Apache Parquet (Recommended)</option>
                  <option value="jsonl">Tokenized JSONL (OpenAI/Anthropic compatible)</option>
                  <option value="arrow">Apache Arrow IPC</option>
                </select>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-600 flex items-start gap-2.5">
              <Shield className="w-4 h-4 text-[#00C9B1] shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                Pilots include human practitioner credential verification logs, step scratchpads, and FASB/Delaware codification ground-truth references.
              </span>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                aria-label="Submit pilot dataset request"
                className="w-full py-3 px-4 bg-[#0088FF] text-white font-bold text-sm rounded-xl hover:bg-[#0077e6] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0088FF] focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span>Provisioning Pilot Manifest...</span>
                ) : (
                  <>
                    <span>Submit Pilot Request</span>
                    <Send className="w-4 h-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
