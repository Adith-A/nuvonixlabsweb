/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CheckCircle2, XCircle, FileCode, ArrowRight, ShieldCheck, Scale, Calculator, BookOpen } from 'lucide-react';
import { TraceComparison } from '../types.ts';

const TRACES: TraceComparison[] = [
  {
    id: 'asc606',
    domain: 'ASC 606 Revenue Allocation',
    title: 'Multi-Element SaaS & Upfront API Implementation with SLA Variable Rebate',
    inputPrompt:
      'Contract: $420k total fee paid upfront on Jan 1 ($360k SaaS for 36 months, $60k custom integration completed Day 60). SLA: $50k penalty rebate if uptime < 99.95% in Year 1. Standalone Selling Prices: SaaS $350k, Integration $70k. Historical uptime meets SLA with 98% probability.',
    uncalibratedOutput: {
      author: 'Standard RLHF Crowd-Annotator',
      score: 54,
      flaw: 'Violates ASC 606-10-32-11 constraint & relative SSP allocation formula. Inverts revenue recognition timing.',
      steps: [
        'Recognizes $60k on Day 1 as unearned cash.',
        'Deducts full $50k SLA rebate immediately from revenue without applying the reversal constraint.',
        'Allocates remaining $370k equally without calculating standalone selling price ratios (allocating 50/50).',
        'Result: Premature $42k revenue leak in Year 1 and ungrounded debit balance on balance sheet.',
      ],
    },
    nuvonixOutput: {
      author: 'Nuvonix Fellow (Ex-Big 4 Senior Audit Manager, CPA)',
      pedigree: 'Licensed CPA · 12 yrs Enterprise Technical Accounting',
      score: 99,
      invariants: 'Identity Preserved: Total Allocated Consideration = $420,000.00 exact.',
      steps: [
        {
          stepNum: '01',
          title: 'Step 1: Identify Performance Obligations (ASC 606-10-25-14)',
          citation: 'ASC 606-10-25-14 & 25-18',
          content:
            'Two distinct obligations: (a) SaaS cloud subscription (stand-ready, over-time transfer per 25-27(a)) and (b) API custom integration (distinct service capable of providing standalone utility).',
        },
        {
          stepNum: '02',
          title: 'Step 2: Transaction Price & Variable Consideration Constraint',
          citation: 'ASC 606-10-32-8(b) & 32-11',
          content:
            'Fixed upfront fee = $420,000. The $50,000 SLA rebate represents variable consideration. Applying the most likely amount method with 98% historical telemetry, it is highly probable that a significant revenue reversal will NOT occur. Invariant constraint satisfied: transaction price remains $420,000.',
        },
        {
          stepNum: '03',
          title: 'Step 3: Relative Standalone Selling Price Allocation',
          citation: 'ASC 606-10-32-29',
          content:
            'Total Standalone Selling Price (SSP) base = $350k + $70k = $420k.\n• SaaS Allocation: ($350,000 / $420,000) × $420,000 = $350,000.00 (83.33%)\n• Custom Integration Allocation: ($70,000 / $420,000) × $420,000 = $70,000.00 (16.67%).',
        },
        {
          stepNum: '04',
          title: 'Step 4: Timing & Revenue Schedule',
          citation: 'ASC 606-10-55-55',
          content:
            'Recognize $70,000 point-in-time on Day 60 upon customer acceptance of the custom API. Recognize $350,000 straight-line ratably across 36 months ($9,722.22/month). Zero balance sheet residual.',
        },
      ],
    },
  },
  {
    id: 'delaware_mae',
    domain: 'Delaware Corporate M&A',
    title: 'Material Adverse Effect (MAE) Reps & Sandbagging Enforcement in $1.8B Merger',
    inputPrompt:
      'Target suffers a sudden 38% EBITDA decline over 2 consecutive quarters prior to closing due to an unexpected FDA warning letter impacting 60% of manufacturing output. Buyer had pre-signing access to raw FDA correspondence and seeks to terminate via Section 6.2(a) MAE condition.',
    uncalibratedOutput: {
      author: 'Standard RLHF Crowd-Annotator',
      score: 48,
      flaw: 'Confuses post-closing indemnity sandbagging clauses with pre-closing satisfaction of closing conditions.',
      steps: [
        'Asserts buyer cannot terminate because buyer "knew about the warning letter before signing".',
        'Fails to distinguish between rep breach remedies and contractual closing conditions under Delaware law.',
        'Ignores the Akorn v. Fresenius durational significance test.',
        'Result: Dangerous legal inaccuracy that would cause catastrophic breach of contract for an acquirer.',
      ],
    },
    nuvonixOutput: {
      author: 'Nuvonix Fellow (Former AmLaw 50 M&A Partner, JD)',
      pedigree: 'Admitted NY Bar & Delaware Chancery Practitioner · 14 yrs M&A',
      score: 98,
      invariants: 'Delaware Precedent Preserved: Akorn v. Fresenius Kabi AG (Del. Ch. 2018).',
      steps: [
        {
          stepNum: '01',
          title: 'Step 1: Substantive MAE Durational Significance Standard',
          citation: 'Akorn v. Fresenius (Del. Ch. 2018)',
          content:
            'Under Delaware Chancery Court jurisprudence (Vice Chancellor Laster in Akorn and In re IBP), an MAE requires an adverse event that substantially threatens the overall earnings potential of the target in a durationally significant manner (measured in years, not short-term cyclical quarters).',
        },
        {
          stepNum: '02',
          title: 'Step 2: Disproportionate Adverse Impact Analysis',
          citation: 'DGCL Section 1.1 MAE Allocation Standard',
          content:
            'While industry-wide regulatory shifts are excluded, plant-specific remediation orders targeting 60% of Target’s sole revenue line disproportionately impact Target relative to peer pharmaceutical companies, stripping away the general carve-out defense.',
        },
        {
          stepNum: '03',
          title: 'Step 3: Sandbagging Jurisprudence vs Closing Conditions',
          citation: 'Eagle Force Holdings v. Campbell (Del. 2018)',
          content:
            'Under Delaware law, sandbagging provisions apply strictly to post-closing indemnification claims for damages under representations and warranties. They do NOT preclude an acquirer from relying on objective failure of a negotiated closing condition (Section 6.2(a)) at closing.',
        },
      ],
    },
  },
];

export const TraceInspector: React.FC = () => {
  const [activeTraceId, setActiveTraceId] = useState<string>('asc606');
  const activeTrace = TRACES.find((t) => t.id === activeTraceId) || TRACES[0];

  return (
    <section
      id="trace-inspector"
      aria-labelledby="trace-inspector-heading"
      className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/90"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            <span className="text-[#0088FF]">Side-by-Side Trajectory Diff</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-700">100% Human-Verified Ground Truth</span>
          </div>

          <h2
            id="trace-inspector-heading"
            className="text-3xl sm:text-4xl font-black text-[#001F3F] tracking-tight leading-tight mb-4"
          >
            Inspect the Difference in Reasoning Quality
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            Compare uncalibrated web-annotator reasoning traces against Nuvonix licensed CPA and Big Law
            practitioner action trajectories.
          </p>
        </div>

        {/* Domain Toggle Tabs */}
        <div className="flex justify-center mb-8">
          <div
            role="tablist"
            aria-label="Trajectory Domain Selector"
            className="inline-flex p-1.5 bg-white border border-slate-200 rounded-xl shadow-2xs"
          >
            {TRACES.map((t) => (
              <button
                key={t.id}
                role="tab"
                id={`trace-tab-${t.id}`}
                aria-selected={activeTraceId === t.id}
                aria-controls="trace-comparison-panel"
                onClick={() => setActiveTraceId(t.id)}
                aria-label={`View ${t.domain} trajectory comparison`}
                className={`px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-[#0088FF] focus-visible:outline-none cursor-pointer ${
                  activeTraceId === t.id
                    ? 'bg-[#001F3F] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#001F3F]'
                }`}
              >
                {t.domain}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Workbench */}
        <div
          id="trace-comparison-panel"
          role="tabpanel"
          aria-labelledby={`trace-tab-${activeTraceId}`}
          className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden"
        >
          {/* Prompt Briefing Bar */}
          <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200">
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-xs font-bold text-[#0088FF] uppercase tracking-wider">
                Benchmark Scenario Prompt
              </span>
              <span className="text-xs font-mono text-slate-500 bg-white px-2.5 py-1 rounded border border-slate-200">
                Evaluation ID: {activeTrace.id.toUpperCase()}-BENCH-409
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#001F3F] mb-1.5">
              {activeTrace.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-mono bg-white p-3 rounded-xl border border-slate-200/80">
              {activeTrace.inputPrompt}
            </p>
          </div>

          {/* Split Diff Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
            
            {/* Left: Standard RLHF Failure */}
            <div className="p-6 sm:p-7 bg-red-50/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-500 shrink-0" aria-hidden="true" />
                    <span className="text-sm font-bold text-slate-900">
                      {activeTrace.uncalibratedOutput.author}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">
                    Score: {activeTrace.uncalibratedOutput.score}/100
                  </span>
                </div>

                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 font-medium mb-5">
                  <span className="font-bold">Critical Failure Mode: </span>
                  {activeTrace.uncalibratedOutput.flaw}
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Observed Chain of Thought:
                  </span>
                  <ol className="space-y-2.5 text-xs text-slate-600 font-mono" aria-label="Uncalibrated reasoning steps">
                    {activeTrace.uncalibratedOutput.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-white border border-red-100">
                        <span className="text-red-500 font-bold">✗</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/80 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Outcome in Frontier Model: </span>
                Causes catastrophic mathematical inversion in multi-million dollar corporate contracts.
              </div>
            </div>

            {/* Right: Nuvonix Invariant Trace */}
            <div className="p-6 sm:p-7 bg-emerald-50/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#7ED957] shrink-0" aria-hidden="true" />
                    <div>
                      <span className="text-sm font-bold text-[#001F3F] block">
                        {activeTrace.nuvonixOutput.author}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {activeTrace.nuvonixOutput.pedigree}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded">
                    Score: {activeTrace.nuvonixOutput.score}/100
                  </span>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-medium mb-5">
                  <span className="font-bold">Deterministic Verification: </span>
                  {activeTrace.nuvonixOutput.invariants}
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Nuvonix Action Trajectory:
                  </span>
                  <div className="space-y-3" aria-label="Nuvonix verified reasoning steps">
                    {activeTrace.nuvonixOutput.steps.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white border border-emerald-200/70 shadow-2xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#001F3F]">{step.title}</span>
                          <span className="text-[10px] font-mono font-semibold text-[#0088FF] bg-blue-50 px-2 py-0.5 rounded">
                            {step.citation}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed font-sans whitespace-pre-line">
                          {step.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/80 text-xs text-emerald-800 font-semibold flex items-center justify-between">
                <span>✓ 100% Human-Verified Ground Truth</span>
                <span className="font-mono text-[11px] text-slate-500">Parquet / JSONL Ready</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
