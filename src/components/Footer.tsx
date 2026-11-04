/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shield, Lock, FileText, Mail, X } from 'lucide-react';

export const Footer: React.FC = () => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | 'contact' | null>(null);

  return (
    <>
      <footer className="bg-white border-t border-slate-200/90 text-slate-600 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-slate-100">
            
            {/* Left: Brand & Statement */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <img
                src="./image.png"
                alt="Nuvonix Labs"
                className="h-11 w-auto max-w-[180px] object-contain"
                referrerPolicy="no-referrer"
              />
              <p className="text-xs text-slate-500 max-w-xs">
                Audit-Ready Reasoning Data for Frontier AI Models
              </p>
            </div>

            {/* Center/Right: Legal & Contact Links */}
            <nav
              aria-label="Footer navigation links"
              className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-semibold text-slate-600"
            >
              <button
                type="button"
                onClick={() => setLegalModal('privacy')}
                aria-label="View Nuvonix Privacy Policy"
                className="hover:text-[#001F3F] transition-colors focus-visible:ring-2 focus-visible:ring-[#0088FF] focus-visible:outline-none rounded px-1.5 py-1 cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setLegalModal('terms')}
                aria-label="View Nuvonix Terms of Service"
                className="hover:text-[#001F3F] transition-colors focus-visible:ring-2 focus-visible:ring-[#0088FF] focus-visible:outline-none rounded px-1.5 py-1 cursor-pointer"
              >
                Terms of Service
              </button>
              <button
                type="button"
                onClick={() => setLegalModal('contact')}
                aria-label="Open Contact information"
                className="hover:text-[#001F3F] transition-colors focus-visible:ring-2 focus-visible:ring-[#0088FF] focus-visible:outline-none rounded px-1.5 py-1 cursor-pointer"
              >
                Contact
              </button>
            </nav>
          </div>

          {/* Bottom Bar: Copyright & Authentic Guarantees (No fabricated claims!) */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
            <p className="font-bold text-[#001F3F]">
              © 2026 Nuvonix LLC. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-[11px] text-slate-500">
              <span className="flex items-center gap-1 font-medium">
                <Shield className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                100% Human-Verified Ground Truth
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 font-medium">
                <Lock className="w-3.5 h-3.5 text-[#0088FF]" aria-hidden="true" />
                Encrypted Client Delivery
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Accessible Legal / Contact Modal */}
      {legalModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in"
          onClick={() => setLegalModal(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="footer-modal-title"
            className="w-full max-w-lg bg-white rounded-2xl p-6 sm:p-7 shadow-2xl border border-slate-200 relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLegalModal(null)}
              aria-label="Close dialog window"
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-[#0088FF] focus-visible:outline-none"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            {legalModal === 'privacy' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#001F3F]">
                  <FileText className="w-5 h-5 text-[#0088FF]" aria-hidden="true" />
                  <h3 id="footer-modal-title" className="text-lg font-bold">Privacy Policy</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Nuvonix Labs strictly isolates client dataset generation environments. Proprietary prompts,
                  pre-release model checkpoints, and confidential corporate client records are never retained
                  or repurposed. We do not use customer data to train public models.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 font-mono">
                  Data Policy: Complete Client Isolation · Zero Cross-Tenant Training
                </div>
              </div>
            )}

            {legalModal === 'terms' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#001F3F]">
                  <FileText className="w-5 h-5 text-[#00C9B1]" aria-hidden="true" />
                  <h3 id="footer-modal-title" className="text-lg font-bold">Terms of Service</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  All action trajectories, scratchpads, and reasoning datasets provisioned by Nuvonix LLC
                  are delivered under an exclusive, perpetual enterprise commercial license.
                  Nuvonix guarantees 100% human practitioner provenance and verifies active licensing
                  status for all annotators.
                </p>
              </div>
            )}

            {legalModal === 'contact' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#001F3F]">
                  <Mail className="w-5 h-5 text-[#7ED957]" aria-hidden="true" />
                  <h3 id="footer-modal-title" className="text-lg font-bold">Contact Nuvonix Labs</h3>
                </div>
                <div className="space-y-2 text-xs text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-800">Enterprise Pilot Inquiries: </span>
                    <a href="mailto:pilot@nuvonixlabs.com" className="text-[#0088FF] hover:underline">
                      pilot@nuvonixlabs.com
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">Expert Bench Admissions: </span>
                    <a href="mailto:fellows@nuvonixlabs.com" className="text-[#0088FF] hover:underline">
                      fellows@nuvonixlabs.com
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">Mailing Address: </span>
                    500 Montgomery Street, Suite 900, San Francisco, CA 94111
                  </p>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 text-right">
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                aria-label="Close dialog"
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[#0088FF] focus-visible:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
