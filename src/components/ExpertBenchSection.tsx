/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, CheckCircle, Scale, BookOpen, Layers, Check } from 'lucide-react';

export const ExpertBenchSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'accounting' | 'legal'>('accounting');

  const specializations = {
    accounting: [
      {
        title: 'ASC 606 Revenue Recognition',
        pedigree: 'Licensed CPAs with Senior Manager or Technical Director Experience',
        trajectory: 'Multi-element allocation, Standalone Selling Price (SSP) estimation, milestone variable consideration.',
        invariant: 'Unearned revenue reconciliation identity & transaction price conservation.',
      },
      {
        title: 'ASC 842 Lease Accounting',
        pedigree: 'Audit Senior Managers & Controllers',
        trajectory: 'Operating vs finance lease classification, right-of-use asset impairment, incremental borrowing rate curves.',
        invariant: 'Present value amortization symmetry.',
      },
      {
        title: 'ASC 740 Accounting for Income Taxes',
        pedigree: 'Licensed CPAs / Masters in Taxation',
        trajectory: 'Valuation allowance evaluation, uncertain tax positions, deferred tax asset/liability netting.',
        invariant: 'Effective tax rate walk reconciliation.',
      },
    ],
    legal: [
      {
        title: 'Delaware M&A & MAE Provisions',
        pedigree: 'Licensed Corporate Attorneys (AmLaw 100 Experience)',
        trajectory: 'Material Adverse Effect carve-outs, interim operating covenants, sandbagging clauses, disclosure schedules.',
        invariant: 'Preservation of Delaware Supreme Court precedent standards (Akorn v. Fresenius).',
      },
      {
        title: 'Cross-Border IP Licensing & Commercial Contracts',
        pedigree: 'Technology Transactions Counsel & Patent Attorneys',
        trajectory: 'Perpetual vs term grant mechanics, indemnity escrow waterfalls, consequential damage waivers.',
        invariant: 'Strict liability trigger boundary mapping.',
      },
      {
        title: 'Executive Compensation & 409A Safe Harbors',
        pedigree: 'Corporate & Executive Benefits Counsel',
        trajectory: 'Golden parachute (Section 280G) gross-ups, option valuation safe harbors, non-solicitation severability.',
        invariant: 'Statutory compliance boundary preservation.',
      },
    ],
  };

  const vettingSteps = [
    {
      num: '01',
      title: 'Credential Verification',
      detail: 'Direct verification of active CPA license with state accountancy boards or State Bar admission in good standing.',
    },
    {
      num: '02',
      title: 'Technical Case Study Screener',
      detail: 'Timed evaluation solving multi-tier ASC 606 transaction price allocations or Delaware M&A contract disputes.',
    },
    {
      num: '03',
      title: 'Action Trajectory Proctoring',
      detail: 'Live proctored evaluation testing step-by-step reasoning completeness, scratchpad calculations, and statutory citations.',
    },
    {
      num: '04',
      title: 'Double-Blind Consensus Auditing',
      detail: 'Every trajectory must achieve unanimous consensus from a secondary senior practitioner peer before training inclusion.',
    },
  ];

  return (
    <section
      id="expert-bench"
      aria-labelledby="expert-bench-heading"
      className="py-20 sm:py-28 bg-slate-50/70 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            <span>Human-in-the-Loop Pedigree</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#0088FF]">3.4% Acceptance Rate</span>
          </div>

          <h2
            id="expert-bench-heading"
            className="text-3xl sm:text-4xl font-black text-[#001F3F] tracking-tight leading-tight mb-4"
          >
            The Nuvonix Expert Bench
          </h2>

          <p className="text-base sm:text-lg text-slate-600">
            We don&apos;t hire generic annotators. Our network is composed exclusively of licensed practitioners
            who have audited balance sheets and negotiated complex corporate transactions.
          </p>
        </motion.div>

        {/* 4-Stage Vetting Pipeline */}
        <div className="mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 text-center mb-6">
            Our 4-Stage Candidate Vetting Pipeline
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {vettingSteps.map((step) => (
              <div
                key={step.num}
                className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs space-y-2"
              >
                <div className="text-sm font-black text-[#0088FF] font-mono">{step.num}</div>
                <h4 className="text-sm font-bold text-[#001F3F]">{step.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Controls for Bench Domains */}
        <div className="flex justify-center mb-10">
          <div
            role="tablist"
            aria-label="Expert Bench Domains"
            className="inline-flex p-1.5 bg-white border border-slate-200 rounded-xl shadow-xs"
          >
            <button
              role="tab"
              id="tab-accounting"
              aria-selected={activeTab === 'accounting'}
              aria-controls="panel-accounting"
              onClick={() => setActiveTab('accounting')}
              aria-label="View Accounting & Financial Audit bench"
              className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-[#0088FF] focus-visible:outline-none cursor-pointer ${
                activeTab === 'accounting'
                  ? 'bg-[#001F3F] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#001F3F]'
              }`}
            >
              Financial &amp; Technical Accounting (CPAs)
            </button>
            <button
              role="tab"
              id="tab-legal"
              aria-selected={activeTab === 'legal'}
              aria-controls="panel-legal"
              onClick={() => setActiveTab('legal')}
              aria-label="View Corporate Law & Regulatory bench"
              className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-[#0088FF] focus-visible:outline-none cursor-pointer ${
                activeTab === 'legal'
                  ? 'bg-[#001F3F] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#001F3F]'
              }`}
            >
              Corporate Law &amp; M&amp;A (JDs)
            </button>
          </div>
        </div>

        {/* Tab Panel Content */}
        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {specializations[activeTab].map((spec, i) => (
            <motion.article
              key={spec.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#0088FF] mb-2.5">
                  <Award className="w-4 h-4 text-[#0088FF]" aria-hidden="true" />
                  <span>Domain Practice Focus</span>
                </div>
                <h3 className="text-lg font-bold text-[#001F3F] mb-2">{spec.title}</h3>
                <p className="text-xs font-semibold text-slate-600 mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  {spec.pedigree}
                </p>
                <div className="space-y-3 text-xs text-slate-600">
                  <div>
                    <span className="font-bold text-slate-800 block mb-0.5">Reasoning Trajectory:</span>
                    <span>{spec.trajectory}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block mb-0.5">Invariant Preservation:</span>
                    <span className="text-slate-700 font-mono text-[11px] bg-slate-100/70 p-1 rounded inline-block">
                      {spec.invariant}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <CheckCircle className="w-3.5 h-3.5 text-[#7ED957]" aria-hidden="true" />
                  Audit-Ready Trajectories
                </span>
                <span className="font-mono text-[11px] font-bold text-[#001F3F]">100% Human Verified</span>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};
