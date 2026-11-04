/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Search, Code, UserCheck, Layers, FileText } from 'lucide-react';
import { AppViewMode } from '../types.ts';

interface NavbarProps {
  currentView: AppViewMode;
  onSelectView: (view: AppViewMode) => void;
  onOpenLogin: () => void;
  onRequestPilot: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSelectView,
  onOpenLogin,
  onRequestPilot,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Wordmark & Official Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelectView('sourcing');
              }}
              aria-label="Nuvonix Labs home page"
              className="group flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-[#0088FF] focus-visible:outline-none rounded-xl p-1"
            >
              <div className="flex items-center">
                <img
                  src="./image.png"
                  alt="Nuvonix Labs"
                  className="h-11 sm:h-12 w-auto max-w-[180px] sm:max-w-[220px] object-contain shrink-0 transition-transform duration-200 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
              </div>
            </a>
          </div>

          {/* Core Platform View Mode Switcher (Synthesizing Handshake, Micro1, Mercor) */}
          <nav
            aria-label="Workspace views"
            className="hidden md:flex items-center p-1 bg-slate-100 border border-slate-200/80 rounded-xl"
          >
            <button
              type="button"
              onClick={() => onSelectView('sourcing')}
              aria-label="Switch to Sourcing Copilot view"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentView === 'sourcing'
                  ? 'bg-white text-[#002046] shadow-2xs'
                  : 'text-slate-600 hover:text-[#002046]'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-[#0088FF]" />
              <span>Sourcing Copilot</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectView('scorecard')}
              aria-label="Switch to AI Vetted Scorecard view"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentView === 'scorecard'
                  ? 'bg-white text-[#002046] shadow-2xs'
                  : 'text-slate-600 hover:text-[#002046]'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-[#00C9B1]" />
              <span>Vetted Scorecard</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectView('assessment')}
              aria-label="Switch to Technical Assessment IDE view"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentView === 'assessment'
                  ? 'bg-white text-[#002046] shadow-2xs'
                  : 'text-slate-600 hover:text-[#002046]'
              }`}
            >
              <Code className="w-3.5 h-3.5 text-[#7ED957]" />
              <span>Assessment IDE</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectView('pipeline')}
              aria-label="Switch to Talent Pipeline table view"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentView === 'pipeline'
                  ? 'bg-white text-[#002046] shadow-2xs'
                  : 'text-slate-600 hover:text-[#002046]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#0088FF]" />
              <span>Pipeline</span>
            </button>
          </nav>

          {/* Actions: Request Pilot & Client Login */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onRequestPilot}
              aria-label="Request a pilot dataset consultation"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 text-white bg-[#0088FF] hover:bg-[#0077e6] rounded-xl transition-all shadow-xs focus-visible:ring-2 focus-visible:ring-[#0088FF] focus-visible:outline-none cursor-pointer"
            >
              <span>Pilot Dataset</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onOpenLogin}
              aria-label="Open client login modal"
              className="inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-bold text-[#002046] border border-[#002046] rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-[#0088FF] focus-visible:ring-offset-2 focus-visible:outline-none cursor-pointer"
            >
              Client Login
            </button>

            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden p-2 text-slate-700 hover:text-[#002046] hover:bg-slate-100 rounded-lg focus-visible:ring-2 focus-visible:ring-[#0088FF] focus-visible:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="md:hidden py-4 border-t border-slate-200/80 space-y-2 animate-in slide-in-from-top-2 duration-150"
          >
            <button
              type="button"
              onClick={() => {
                onSelectView('sourcing');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm font-bold rounded-lg ${
                currentView === 'sourcing' ? 'bg-slate-100 text-[#002046]' : 'text-slate-700'
              }`}
            >
              Sourcing Copilot (Employer View)
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectView('scorecard');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm font-bold rounded-lg ${
                currentView === 'scorecard' ? 'bg-slate-100 text-[#002046]' : 'text-slate-700'
              }`}
            >
              AI Vetted Scorecard (Profile View)
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectView('assessment');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm font-bold rounded-lg ${
                currentView === 'assessment' ? 'bg-slate-100 text-[#002046]' : 'text-slate-700'
              }`}
            >
              Assessment IDE (Candidate View)
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectView('pipeline');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm font-bold rounded-lg ${
                currentView === 'pipeline' ? 'bg-slate-100 text-[#002046]' : 'text-slate-700'
              }`}
            >
              Talent Pipeline (List-View Table)
            </button>
            <div className="pt-2 px-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestPilot();
                }}
                className="w-full text-center py-2.5 text-sm font-bold text-white bg-[#0088FF] rounded-xl hover:bg-[#0077e6]"
              >
                Request a Pilot Dataset
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
