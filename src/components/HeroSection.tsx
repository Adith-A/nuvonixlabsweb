/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown, CheckCircle2, ShieldCheck, FileText, Scale, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onRequestPilot: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onRequestPilot }) => {
  const handleScrollToScreener = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const screener = document.getElementById('screener');
    if (screener) {
      screener.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToInspector = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const inspector = document.getElementById('trace-inspector');
    if (inspector) {
      inspector.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-white pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-slate-100"
    >
      {/* Precision grid pattern */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-[linear-gradient(to_right,#0020460A_1px,transparent_1px),linear-gradient(to_bottom,#0020460A_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_65%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Authentic editorial category breadcrumb */}
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-6 bg-slate-100/80 px-4 py-1.5 rounded-full border border-slate-200/80">
            <span className="text-[#0088FF]">Enterprise Frontier RLHF</span>
            <span aria-hidden="true" className="text-slate-300">|</span>
            <span className="text-[#002046]">Ground-Truth Invariants</span>
            <span aria-hidden="true" className="text-slate-300">|</span>
            <span className="text-emerald-700">Zero AI Contamination</span>
          </div>

          {/* Primary Headline */}
          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#001F3F] leading-[1.12] mb-6 text-balance"
          >
            Audit-Ready Reasoning Data for Frontier AI.
          </h1>

          {/* Sub-headline */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed mb-10 text-balance">
            We provide elite, pre-vetted CPAs and Corporate Lawyers to generate flawless action
            trajectories and reasoning traces for enterprise AI models.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
            {/* CTA 1: Primary, Azure Blue background, white text */}
            <a
              href="mailto:pilot@nuvonixlabs.com?subject=Pilot%20Dataset%20Inquiry%20-%20Nuvonix%20Labs&body=Hello%20Nuvonix%20Team%2C%0A%0AWe%20are%20building%20frontier%20enterprise%20models%20and%20would%20like%20to%20pilot%20audit-ready%20reasoning%20data%20in%20Accounting%20(ASC%20606)%20and%20Corporate%20Law.%0A%0AOrganization%3A%0AModel%20Scale%3A%0ADesired%20Batch%20Size%3A"
              onClick={(e) => {
                onRequestPilot();
              }}
              aria-label="Request a Pilot Dataset via email or pilot specification form"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-bold text-white bg-[#0088FF] hover:bg-[#0077e6] active:bg-[#006bd1] rounded-xl transition-all shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#0088FF] focus-visible:ring-offset-2 focus-visible:outline-none cursor-pointer"
            >
              <span>Request a Pilot Dataset</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>

            {/* CTA 2: Secondary, clear background, Dark Navy border */}
            <a
              href="#screener"
              onClick={handleScrollToScreener}
              aria-label="Apply to the Expert Bench, scroll to technical interview screener"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-bold text-[#001F3F] bg-white border-2 border-[#001F3F] hover:bg-slate-50 active:bg-slate-100 rounded-xl transition-all focus-visible:ring-2 focus-visible:ring-[#001F3F] focus-visible:ring-offset-2 focus-visible:outline-none cursor-pointer"
            >
              <span>Apply to the Expert Bench</span>
              <ChevronDown className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        {/* Supporting Verified Truth Markers (NO fabricated claims!) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-slate-200/80 max-w-5xl mx-auto"
        >
          <div className="p-4.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-1">
              <Scale className="w-4 h-4 text-[#0088FF]" aria-hidden="true" />
              <span>Practitioner Pedigree</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#001F3F] tabular-nums">100%</div>
            <div className="text-xs text-slate-600 mt-0.5">Big-4 CPAs &amp; AmLaw 100 JDs</div>
          </div>

          <div className="p-4.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-1">
              <FileText className="w-4 h-4 text-[#00C9B1]" aria-hidden="true" />
              <span>Trace Provenance</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#001F3F] tabular-nums">0%</div>
            <div className="text-xs text-slate-600 mt-0.5">Synthetic AI contamination</div>
          </div>

          <div className="p-4.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-1">
              <CheckCircle2 className="w-4 h-4 text-[#7ED957]" aria-hidden="true" />
              <span>QA Validation</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#001F3F] tabular-nums">Multi-Tier</div>
            <div className="text-xs text-slate-600 mt-0.5">Automated LLM-as-a-judge gate</div>
          </div>

          <div className="p-4.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-1">
              <ShieldCheck className="w-4 h-4 text-[#0088FF]" aria-hidden="true" />
              <span>Delivery Formats</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#001F3F] tabular-nums">Parquet &amp; JSONL</div>
            <div className="text-xs text-slate-600 mt-0.5">Pre-tokenized training corpora</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
