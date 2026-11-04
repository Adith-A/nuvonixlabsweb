/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  CheckCircle2,
  FileCheck2,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Check,
  X,
} from 'lucide-react';
import { ScreenerTrack, ChatMessage, ScenarioData } from '../types.ts';

const SCENARIOS: Record<ScreenerTrack, ScenarioData> = {
  accounting: {
    id: 'accounting',
    title: 'ASC 606: Multi-Element SaaS Revenue Allocation with Variable Consideration',
    badge: 'CPA Technical Accounting Track',
    citation: 'FASB ASC 606-10-32-29 (Relative Standalone Selling Price Method)',
    difficulty: 'Senior Manager / Fellow Level',
    problemStatement:
      'A B2B enterprise client signs a 3-year master agreement on Jan 1. The contract includes: (1) Cloud Hosting SaaS ($360,000 upfront), (2) Onboarding & Custom API Integration completed by Day 60 ($60,000 upfront), and (3) A $50,000 contingent rebate if uptime falls below 99.95% in Year 1. Standalone selling prices (SSP) are determined to be: SaaS $350k, Integration $70k. Historical logs demonstrate 98% uptime SLA compliance.',
    excerpts: [
      { title: 'Clause 4.1', text: 'Customer pays $420,000 upfront on invoice date.' },
      { title: 'Clause 7.2', text: 'SLA uptime rebate of $50,000 payable at end of Year 1 upon audit.' },
      { title: 'Historical Evidence', text: '98% likelihood of meeting 99.95% uptime based on 5-year logs.' },
    ],
    initialQuestion:
      'Welcome to the Nuvonix Technical Screener for Senior Technical Accounting Fellows. Under FASB ASC 606, how do you determine the total transaction price, allocate consideration among performance obligations, and account for the SLA uptime rebate? Walk me step-by-step through your reasoning trajectory.',
    passingAnswer:
      'Step 1 (Identify Performance Obligations - ASC 606-10-25-14): Two distinct obligations exist: (a) SaaS cloud subscription (stand-ready over-time transfer) and (b) Custom API integration (point-in-time upon Day 60 customer acceptance).\n\nStep 2 (Transaction Price & Variable Consideration Constraint - ASC 606-10-32-8 & 32-11): Fixed upfront consideration is $420,000. Under the most likely amount method, because 98% historical telemetry indicates it is highly probable that a significant reversal will NOT occur, the $50k SLA rebate is not deducted. Total transaction price = $420,000.\n\nStep 3 (Allocate Transaction Price - ASC 606-10-32-29): Total standalone selling prices = $350k + $70k = $420k.\n• SaaS: (350/420) × $420k = $350,000.00 (83.33%)\n• Custom API: (70/420) × $420k = $70,000.00 (16.67%).\n\nStep 4 (Revenue Schedule Timing): Recognize $70,000 upon Day 60 completion. Recognize $350,000 straight-line ratably across 36 months ($9,722.22/month).',
    flawedAnswer:
      'I would take the $420k and subtract the $50k penalty rebate immediately leaving $370k. Then split the remaining money in half between the SaaS software and the API setup. The API revenue can be booked right away when cash is received.',
    requiredInvariants: [
      'ASC 606-10-32-11 variable consideration reversal constraint analysis',
      'Relative standalone selling price allocation formula preservation',
      'Transaction price identity conservation ($420,000 total)',
    ],
  },
  legal: {
    id: 'legal',
    title: 'Delaware M&A: Material Adverse Effect (MAE) Reps & Sandbagging Enforcement',
    badge: 'AmLaw Corporate Law Track',
    citation: 'Delaware General Corporation Law (DGCL) / Akorn v. Fresenius (Del. Ch. 2018)',
    difficulty: 'Partner / Senior Associate Level',
    problemStatement:
      'Target in an all-cash $1.8B merger suffers a sudden 38% EBITDA decline over two consecutive quarters prior to closing due to an unexpected FDA warning letter affecting its primary production plant. The buyer threatens to invoke the Material Adverse Effect (MAE) closing condition. Buyer had pre-signing access to raw FDA correspondence during due diligence.',
    excerpts: [
      { title: 'Merger Agreement Section 6.2(a)', text: 'Condition to Closing: Target has not suffered an MAE.' },
      { title: 'Section 1.1 MAE Definition', text: 'Carves out general regulatory shifts, but contains a disproportionate adverse impact qualifier.' },
      { title: 'Section 9.8', text: 'Pro-sandbagging clause expressly preserving buyer remedies regardless of pre-signing knowledge.' },
    ],
    initialQuestion:
      'Under Delaware Chancery Court jurisprudence (specifically Akorn v. Fresenius and In re IBP), analyze whether the buyer can lawfully refuse to close under the MAE closing condition. How does the presence of the pro-sandbagging clause interact with the pre-signing knowledge?',
    passingAnswer:
      '1. Substantive MAE Analysis (Akorn Standard): Under Akorn v. Fresenius Kabi AG (Del. Ch. 2018), establishing an MAE requires the adverse event to substantially threaten the overall earnings potential of the target in a commercially reasonable manner over a durationally significant period (typically measured in years, not short-term quarters).\n\n2. Disproportionate Impact Exception: While general regulatory changes are carved out, the plant-specific FDA warning letter directly impairs 60%+ of operational output, triggering the disproportionate impact qualifier against industry peers.\n\n3. Pre-Signing Knowledge & Sandbagging: While Section 9.8 contains an express pro-sandbagging clause, under Delaware law (Eagle Force Holdings v. Campbell), sandbagging provisions govern post-closing indemnification claims for breaches of representations, NOT satisfaction of independent closing conditions. If the MAE standard is met, buyer may refuse to close regardless of pre-signing knowledge.',
    flawedAnswer:
      'Because buyer knew about the FDA letters during due diligence, they waived their rights under the sandbagging rule. Buyer must close the acquisition and sue for damages later.',
    requiredInvariants: [
      'Akorn v. Fresenius durational significance test application',
      'Distinction between post-closing indemnity vs pre-closing conditions',
      'Disproportionate impact exception analysis',
    ],
  },
  tax: {
    id: 'tax',
    title: 'ASC 740: Corporate Tax Valuation Allowance & Net Operating Loss Realization',
    badge: 'Big-4 National Tax Practice Track',
    citation: 'FASB ASC 740-10-30-18 (Valuation Allowance Standard)',
    difficulty: 'Tax Director Level',
    problemStatement:
      'A domestic corporate client generates $12M in pre-tax accounting income in 2026, but has a 3-year cumulative pre-tax loss of $18M (significant negative evidence). Management forecasts rapid profitability based on an uncommitted sales pipeline. The deferred tax asset (DTA) balance stands at $6.4M from net operating losses.',
    excerpts: [
      { title: 'ASC 740-10-30-21', text: 'Cumulative losses in recent years represent significant negative evidence that is difficult to overcome.' },
      { title: 'ASC 740-10-30-23', text: 'Forecasted income cannot be based on mere subjective management assertions.' },
    ],
    initialQuestion:
      'Under FASB ASC 740, evaluate whether a full or partial valuation allowance must be recorded against the $6.4M DTA. Distinguish between positive objective evidence and subjective management forecasts.',
    passingAnswer:
      '1. Assessment of Evidence (ASC 740-10-30-21): A cumulative 3-year loss position of $18M represents heavy objective negative evidence. Under ASC 740-10-30-23, uncommitted sales pipeline forecasts are subjective and cannot outweigh verifiable historical losses.\n\n2. Available Sources of Taxable Income (ASC 740-10-30-18): Evaluate: (a) Future reversals of existing taxable temporary differences (DTLs), (b) Future taxable income exclusive of reversing differences, and (c) Prudent tax planning strategies. In the absence of sufficient reversing DTLs, a full valuation allowance of $6.4M must be recorded through income tax expense.',
    flawedAnswer:
      'Since management expects the company to turn profitable soon, no valuation allowance is required and the full $6.4M tax credit should remain on the balance sheet.',
    requiredInvariants: [
      'Objective historical evidence primacy over subjective forecasts',
      'ASC 740-10-30-18 income source taxonomy adherence',
      'Balance sheet DTA impairment recognition',
    ],
  },
};

export const AIScreenerSection: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<ScreenerTrack>('accounting');
  const [inputText, setInputText] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Initial simulated messages demonstrating the requirement:
  // "Add placeholder chat bubbles to show a simulated interaction (e.g., light gray bubble for AI asking an accounting question, Azure Blue bubble for user replying)."
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: SCENARIOS.accounting.initialQuestion,
      timestamp: '10:14 AM',
    },
    {
      id: 'm2',
      sender: 'user',
      text: 'Under FASB ASC 606, I first identify two performance obligations: the SaaS cloud subscription (stand-ready obligation recognized over time) and custom API integration (distinct point-in-time service under ASC 606-10-25-14). For the variable consideration SLA rebate ($50,000), since historical uptime exceeds 99.95% with 98% certainty, under ASC 606-10-32-11 the constraint requires including the full $420k without deducting the rebate unless a probable reversal occurs.',
      timestamp: '10:17 AM',
    },
    {
      id: 'm3',
      sender: 'ai',
      text: 'Rigorous analysis on the variable consideration constraint. Now specify your relative Standalone Selling Price (SSP) allocation calculation across the $420,000 consideration and define the exact journal entry timing for Day 60.',
      timestamp: '10:18 AM',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const currentScenario = SCENARIOS[selectedTrack];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isEvaluating]);

  const handleTrackChange = (track: ScreenerTrack) => {
    setSelectedTrack(track);
    setInputText('');
    setInputError(null);
    const scenario = SCENARIOS[track];

    setMessages([
      {
        id: `init-${track}`,
        sender: 'ai',
        text: scenario.initialQuestion,
        timestamp: '10:00 AM',
      },
    ]);
  };

  // CLIENT-SIDE FORM VALIDATION
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if empty
    if (!inputText.trim()) {
      setInputError('Reasoning trajectory cannot be empty. Please enter your step-by-step analysis.');
      inputRef.current?.focus();
      return;
    }

    const userText = inputText.trim();
    setInputError(null);
    setInputText('');

    // Append user message in Azure Blue bubble
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsEvaluating(true);

    // Realistic evaluation by the Proctor
    setTimeout(() => {
      const lower = userText.toLowerCase();
      const hasCitations = lower.includes('asc') || lower.includes('akorn') || lower.includes('step') || lower.includes('dgcl');
      const hasDepth = userText.length > 150;
      const isHighQuality = hasCitations && hasDepth;

      const aiReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: isHighQuality
          ? `[EVALUATION REPORT · SCORE 98/100 · PASS]\nYour action trajectory conforms to Nuvonix Frontier Standards:\n\n✓ Invariant Preservation: Mathematical & contractual boundaries verified.\n✓ Codification Citations: Direct ground-truth citations to FASB/Delaware standards.\n✓ Logical Density: Exhaustive multi-step proof chain with zero circular leaps.\n\nResult: Verified for Nuvonix Expert Bench inclusion.`
          : `[EVALUATION REPORT · SCORE 64/100 · REVISION REQUIRED]\nTrajectory fell short of Nuvonix Bench standards:\n\n✗ Missing Codification: Failed to cite specific subsection (e.g., ASC 606-10-32-11 or Akorn v. Fresenius).\n✗ Invariant Violation: Failed to preserve identity constraints or durational significance tests.\n\nPlease revise with complete statutory citations and explicit numerical derivations.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        evaluation: {
          score: isHighQuality ? 98 : 64,
          pass: isHighQuality,
          grade: isHighQuality ? 'Tier-1 Fellow' : 'Uncalibrated / Reject',
          reasoningTrajectory: isHighQuality ? 'Flawless Multi-Step Proof' : 'Gapped Assertions',
          citationVerification: isHighQuality ? 'Verified against FASB / DGCL' : 'Missing Primary Citation',
          invariantCheck: isHighQuality ? 'All Identity Constraints Upheld' : 'Invariant Bounds Violated',
          hallucinationRate: isHighQuality ? '0.00%' : '14.2% Ungrounded Claims',
          feedback: isHighQuality
            ? 'Demonstrates Big-4 CPA / AmLaw 100 JD technical rigor suitable for frontier training data.'
            : 'Fails professional verification threshold. Requires grounding in governing standards.',
          rubricBreakdown: {
            statutoryFidelity: isHighQuality ? 99 : 58,
            arithmeticIntegrity: isHighQuality ? 98 : 62,
            chainCompleteness: isHighQuality ? 97 : 65,
            contractualBoundary: isHighQuality ? 98 : 60,
          },
        },
      };

      setMessages((prev) => [...prev, aiReply]);
      setIsEvaluating(false);
    }, 1100);
  };

  const handleLoadSample = (type: 'passing' | 'flawed') => {
    setInputText(type === 'passing' ? currentScenario.passingAnswer : currentScenario.flawedAnswer);
    setInputError(null);
    inputRef.current?.focus();
  };

  return (
    <section
      id="screener"
      aria-labelledby="screener-section-title"
      className="py-20 sm:py-28 bg-slate-50 border-t border-b border-slate-200/90"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            <span>Rigorous Candidate Vetting</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#0088FF]">Interactive Screener Simulation</span>
          </div>

          <h2
            id="screener-section-title"
            className="text-3xl sm:text-4xl font-black text-[#001F3F] tracking-tight leading-tight mb-4"
          >
            Nuvonix Expert Network: Technical Screener
          </h2>

          <p className="text-base sm:text-lg text-slate-600">
            Every candidate is evaluated on complex ASC 606 or legal contract scenarios by an AI partner.
            Test our automated technical interview harness below.
          </p>
        </motion.div>

        {/* Track Switcher */}
        <div className="flex justify-center mb-8">
          <div
            role="tablist"
            aria-label="Interview tracks"
            className="inline-flex flex-wrap justify-center p-1.5 bg-white border border-slate-200 rounded-xl shadow-2xs gap-1"
          >
            <button
              type="button"
              role="tab"
              id="screener-tab-acc"
              aria-selected={selectedTrack === 'accounting'}
              aria-controls="screener-panel"
              onClick={() => handleTrackChange('accounting')}
              aria-label="Switch to ASC 606 Accounting Track"
              className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-[#0088FF] focus-visible:outline-none cursor-pointer ${
                selectedTrack === 'accounting'
                  ? 'bg-[#001F3F] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#001F3F]'
              }`}
            >
              Track A: ASC 606 SaaS Allocation
            </button>
            <button
              type="button"
              role="tab"
              id="screener-tab-leg"
              aria-selected={selectedTrack === 'legal'}
              aria-controls="screener-panel"
              onClick={() => handleTrackChange('legal')}
              aria-label="Switch to Delaware M&A Legal Track"
              className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-[#0088FF] focus-visible:outline-none cursor-pointer ${
                selectedTrack === 'legal'
                  ? 'bg-[#001F3F] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#001F3F]'
              }`}
            >
              Track B: Delaware M&amp;A MAE Review
            </button>
            <button
              type="button"
              role="tab"
              id="screener-tab-tax"
              aria-selected={selectedTrack === 'tax'}
              aria-controls="screener-panel"
              onClick={() => handleTrackChange('tax')}
              aria-label="Switch to ASC 740 Tax Valuation Track"
              className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-[#0088FF] focus-visible:outline-none cursor-pointer ${
                selectedTrack === 'tax'
                  ? 'bg-[#001F3F] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#001F3F]'
              }`}
            >
              Track C: ASC 740 Tax Valuation
            </button>
          </div>
        </div>

        {/* Split Screen Layout */}
        <motion.div
          id="screener-panel"
          role="tabpanel"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left Side: Instructions & Scenario Briefing */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-[#0088FF] tracking-wider uppercase">
                  {currentScenario.badge}
                </span>
                <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  Level: {currentScenario.difficulty}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#001F3F] leading-snug">
                {currentScenario.title}
              </h3>
              <p className="text-xs font-semibold text-emerald-800 mt-1 flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5 text-[#00C9B1]" aria-hidden="true" />
                <span>Authority: {currentScenario.citation}</span>
              </p>
            </div>

            {/* Fact Pattern */}
            <div className="bg-slate-50 p-4.5 rounded-xl border border-slate-200/80 text-xs text-slate-700 space-y-2.5">
              <span className="font-bold text-[#001F3F] block uppercase tracking-wider text-[11px]">
                Factual Scenario &amp; Terms:
              </span>
              <p className="leading-relaxed">{currentScenario.problemStatement}</p>
              
              <div className="pt-2 border-t border-slate-200/60 space-y-1.5">
                <span className="font-bold text-slate-800 text-[11px]">Governing Excerpts:</span>
                {currentScenario.excerpts.map((excerpt, idx) => (
                  <div key={idx} className="text-slate-600 pl-2.5 border-l-2 border-[#0088FF]/50 text-[11px]">
                    <span className="font-semibold text-slate-800">{excerpt.title}: </span>
                    <span className="italic">{excerpt.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Invariant Rules */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-[#001F3F] uppercase tracking-wider block">
                Required Invariant Assertions:
              </span>
              <div className="space-y-1.5 text-xs">
                {currentScenario.requiredInvariants.map((req, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#7ED957] shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-slate-700">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Test Controls */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Test Evaluation Rubrics Instantly:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleLoadSample('passing')}
                  aria-label="Load high scoring Big-4 CPA reasoning sample"
                  className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg flex items-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-[#0088FF] focus-visible:outline-none cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#00C9B1]" aria-hidden="true" />
                  <span>Load 98/100 Solution</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadSample('flawed')}
                  aria-label="Load flawed generalist crowd-worker answer to test rubric rejection"
                  className="px-3 py-1.5 text-xs font-semibold text-red-800 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg flex items-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-[#0088FF] focus-visible:outline-none cursor-pointer"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-red-500" aria-hidden="true" />
                  <span>Load 64/100 Attempt</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleTrackChange(selectedTrack)}
                  aria-label="Reset simulation"
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1 transition-colors focus-visible:ring-2 focus-visible:ring-[#0088FF] focus-visible:outline-none cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" aria-hidden="true" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Mock Chat Interface for Gemini AI */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-slate-200/90 flex flex-col h-[620px] overflow-hidden">
            
            {/* Proctor Header */}
            <div className="px-6 py-4 border-b border-slate-100 bg-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#001F3F]">
                  <Bot className="w-5 h-5 text-[#0088FF]" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#001F3F]">Gemini Autonomous Proctor</span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Active Assessor
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Autonomous Reasoning &amp; Codification Screener</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                  {messages.length} Traces Active
                </span>
              </div>
            </div>

            {/* Scrollable Message History Area */}
            <div
              className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 bg-slate-50/50"
              aria-label="Screener message transcript"
              role="log"
            >
              {messages.map((msg) => {
                const isAI = msg.sender === 'ai';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}
                  >
                    {isAI && (
                      <div
                        aria-hidden="true"
                        className="w-8 h-8 rounded-lg bg-slate-200/80 text-slate-700 flex items-center justify-center shrink-0 mt-1 shadow-2xs"
                      >
                        <Bot className="w-4 h-4 text-[#001F3F]" />
                      </div>
                    )}

                    <div className="flex flex-col max-w-[85%] sm:max-w-[80%]">
                      {/* Chat Bubbles:
                          AI: light gray bubble (bg-slate-100 text-slate-900)
                          User: Azure Blue bubble (bg-[#0088FF] text-white)
                      */}
                      <div
                        className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                          isAI
                            ? 'bg-slate-100 text-slate-900 border border-slate-200/80 rounded-tl-xs shadow-2xs'
                            : 'bg-[#0088FF] text-white rounded-tr-xs shadow-2xs font-normal'
                        }`}
                      >
                        {msg.text}
                      </div>

                      {/* Detailed Evaluation Card */}
                      {msg.evaluation && (
                        <div className="mt-2.5 p-4 bg-white border border-slate-200 rounded-xl text-xs shadow-2xs space-y-2">
                          <div className="flex items-center justify-between font-bold pb-2 border-b border-slate-100">
                            <span className={msg.evaluation.pass ? 'text-emerald-700' : 'text-red-600'}>
                              {msg.evaluation.pass ? '✓ Bench Verified' : '✗ Uncalibrated / Rejected'}
                            </span>
                            <span className="font-mono text-slate-800 tabular-nums">
                              Score: {msg.evaluation.score}/100
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                            <div>Trajectory: <span className="font-semibold text-slate-900">{msg.evaluation.reasoningTrajectory}</span></div>
                            <div>Citation: <span className="font-semibold text-slate-900">{msg.evaluation.citationVerification}</span></div>
                            <div>Invariants: <span className="font-semibold text-slate-900">{msg.evaluation.invariantCheck}</span></div>
                            <div>Hallucination: <span className="font-semibold text-slate-900">{msg.evaluation.hallucinationRate}</span></div>
                          </div>

                          {/* Rubric Breakdown Grid */}
                          <div className="pt-2 border-t border-slate-100 grid grid-cols-4 gap-1 text-[10px] text-center font-mono">
                            <div className="bg-slate-50 p-1 rounded">
                              <div className="text-slate-400">Statute</div>
                              <div className="font-bold text-slate-800">{msg.evaluation.rubricBreakdown.statutoryFidelity}</div>
                            </div>
                            <div className="bg-slate-50 p-1 rounded">
                              <div className="text-slate-400">Math</div>
                              <div className="font-bold text-slate-800">{msg.evaluation.rubricBreakdown.arithmeticIntegrity}</div>
                            </div>
                            <div className="bg-slate-50 p-1 rounded">
                              <div className="text-slate-400">Chain</div>
                              <div className="font-bold text-slate-800">{msg.evaluation.rubricBreakdown.chainCompleteness}</div>
                            </div>
                            <div className="bg-slate-50 p-1 rounded">
                              <div className="text-slate-400">Bounds</div>
                              <div className="font-bold text-slate-800">{msg.evaluation.rubricBreakdown.contractualBoundary}</div>
                            </div>
                          </div>

                          <p className="text-[11px] text-slate-500 italic pt-1">
                            {msg.evaluation.feedback}
                          </p>
                        </div>
                      )}

                      <span
                        className={`text-[10px] text-slate-400 mt-1 ${
                          isAI ? 'text-left' : 'text-right'
                        }`}
                      >
                        {msg.sender === 'ai' ? 'Gemini Screener' : 'Candidate'} · {msg.timestamp}
                      </span>
                    </div>

                    {!isAI && (
                      <div
                        aria-hidden="true"
                        className="w-8 h-8 rounded-lg bg-[#001F3F] text-white flex items-center justify-center shrink-0 mt-1 shadow-2xs"
                      >
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                );
              })}

              {isEvaluating && (
                <div className="flex items-start gap-3 justify-start">
                  <div className="w-8 h-8 rounded-lg bg-slate-200/80 text-slate-700 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-[#001F3F]" />
                  </div>
                  <div className="p-3.5 bg-slate-100 border border-slate-200 rounded-2xl rounded-tl-xs text-xs text-slate-600 flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-[#0088FF]/30 border-t-[#0088FF] rounded-full animate-spin" />
                    <span>Auditing reasoning trajectory against FASB/Delaware corpora...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Field with Client-Side Form Validation */}
            <div className="p-4 bg-white border-t border-slate-200 shrink-0">
              <form onSubmit={handleSendMessage} noValidate className="space-y-2">
                
                {/* Visual Feedback Error Alert */}
                {inputError && (
                  <div
                    role="alert"
                    aria-live="polite"
                    className="flex items-center gap-2 text-xs font-semibold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200 transition-all animate-in fade-in"
                  >
                    <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" aria-hidden="true" />
                    <span>{inputError}</span>
                  </div>
                )}

                <div className="relative flex items-end gap-2">
                  <div className="relative flex-1">
                    <textarea
                      ref={inputRef}
                      rows={2}
                      value={inputText}
                      onChange={(e) => {
                        setInputText(e.target.value);
                        if (inputError) setInputError(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(e);
                        }
                      }}
                      aria-label="Type your reasoning here"
                      aria-invalid={inputError !== null}
                      placeholder="Type your reasoning here (e.g., cite ASC 606 subsections or DGCL precedents)..."
                      className={`w-full p-3 text-xs sm:text-sm text-slate-900 bg-white rounded-xl resize-none placeholder:text-slate-400 focus-visible:outline-none transition-all ${
                        inputError
                          ? 'border-2 border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50/20'
                          : 'border border-slate-300 focus:border-[#0088FF] focus:ring-2 focus:ring-[#0088FF]/20'
                      }`}
                    />
                  </div>

                  {/* Submit Button (Vibrant Tech Green #7ED957) */}
                  <button
                    type="submit"
                    disabled={isEvaluating}
                    aria-label="Submit reasoning analysis to Gemini Screener"
                    className="h-11 px-5 bg-[#7ED957] hover:bg-[#6ecc48] active:bg-[#5ebf38] text-[#001F3F] font-black text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#001F3F] focus-visible:ring-offset-2 focus-visible:outline-none cursor-pointer"
                  >
                    <span>Submit</span>
                    <Send className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
                  <span>Press <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded font-mono text-[10px]">Enter</kbd> to submit</span>
                  <span>Evaluated against Big-4 / AmLaw 100 gold-standard rubrics</span>
                </div>
              </form>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
