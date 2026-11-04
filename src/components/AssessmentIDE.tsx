/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Play,
  Clock,
  CheckCircle2,
  XCircle,
  FileCode,
  Sparkles,
  RotateCcw,
  AlertCircle,
  Terminal,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Check,
} from 'lucide-react';
import { MOCK_ASSESSMENT } from '../data/mockCandidates.ts';

export const AssessmentIDE: React.FC = () => {
  const [code, setCode] = useState(MOCK_ASSESSMENT.starterCode);
  const [timeLeft, setTimeLeft] = useState(MOCK_ASSESSMENT.timeLimitMinutes * 60);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'tests' | 'terminal'>('editor');
  const [testResults, setTestResults] = useState(MOCK_ASSESSMENT.testCases);
  const [showAIFeedback, setShowAIFeedback] = useState(false);

  // Persistent countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleRunTests = () => {
    setIsRunningTests(true);
    setShowAIFeedback(false);

    setTimeout(() => {
      setIsRunningTests(false);
      setShowAIFeedback(true);
      setActiveTab('tests');
    }, 1100);
  };

  const handleResetCode = () => {
    setCode(MOCK_ASSESSMENT.starterCode);
    setShowAIFeedback(false);
  };

  return (
    <section
      aria-label="Candidate Technical Assessment IDE"
      className="py-6 sm:py-10 bg-slate-50 min-h-[calc(100vh-5rem)] border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Top Header: Assessment Title & Floating Sticky Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200/80 gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
              <span className="text-[#0088FF] font-bold">Micro1 / Handshake Assessment Engine</span>
              <span aria-hidden="true">·</span>
              <span>Autonomous Evaluation Environment</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#002046] tracking-tight">
              {MOCK_ASSESSMENT.title}
            </h1>
          </div>

          {/* Persistent Floating Timer & Actions */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs font-mono text-xs">
              <Clock className="w-4 h-4 text-[#0088FF]" aria-hidden="true" />
              <span className="text-slate-500">Time Remaining:</span>
              <span className={`font-bold tabular-nums ${timeLeft < 300 ? 'text-red-600' : 'text-[#002046]'}`}>
                {formatTimer(timeLeft)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleResetCode}
              aria-label="Reset starter code"
              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Split-Pane Layout: Problem Statement on Left, Code Editor on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Pane (Fixed Problem Statement, Invariants & Constraints) */}
          <div className="lg:col-span-5 bg-white rounded-xl p-6 border border-slate-200/90 shadow-2xs h-[640px] overflow-y-auto space-y-5">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-[#0088FF] uppercase font-mono tracking-wider">
                  Difficulty: {MOCK_ASSESSMENT.difficulty}
                </span>
                <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                  Time: {MOCK_ASSESSMENT.timeLimitMinutes} mins
                </span>
              </div>
              <h2 className="text-lg font-bold text-[#002046] leading-snug">
                ASC 606 Relative Standalone Selling Price Allocation
              </h2>
            </div>

            {/* Description */}
            <div className="text-xs text-slate-700 leading-relaxed space-y-3 font-sans">
              <p className="whitespace-pre-line">{MOCK_ASSESSMENT.description}</p>
            </div>

            {/* Invariant Rules */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-[#002046] uppercase font-mono tracking-wider block">
                Deterministic Invariant Constraints:
              </span>
              <ul className="space-y-2 text-xs text-slate-600">
                {MOCK_ASSESSMENT.invariants.map((inv, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200/70">
                    <CheckCircle2 className="w-4 h-4 text-[#7ED957] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{inv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Test Suite Specifications */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-[#002046] uppercase font-mono tracking-wider block">
                Validation Test Tranches:
              </span>
              <div className="space-y-1.5 text-xs font-mono text-slate-600">
                <div className="p-2 bg-slate-50 rounded border border-slate-200/70">
                  <span className="font-bold text-slate-800">Tranche 1: </span>
                  <span>98% High-Certainty SLA Contract ($420k SSP)</span>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-200/70">
                  <span className="font-bold text-slate-800">Tranche 2: </span>
                  <span>Sub-95% Constrained Variable Consideration Deduction</span>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-200/70">
                  <span className="font-bold text-slate-800">Tranche 3: </span>
                  <span>Floating-point rounding residual absorption</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Pane (Interactive Code Editor + Real-Time Feedback Panel) */}
          <div className="lg:col-span-7 flex flex-col h-[640px] bg-slate-950 rounded-xl border border-slate-800 shadow-xl overflow-hidden relative">
            
            {/* Editor Toolbar */}
            <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="w-3 h-3 rounded-full bg-slate-700" />
                  <span className="w-3 h-3 rounded-full bg-slate-700" />
                  <span className="w-3 h-3 rounded-full bg-slate-700" />
                </div>
                <span className="text-xs font-mono text-slate-300">
                  allocate_asc606.ts
                </span>
              </div>

              {/* View Tabs */}
              <div className="flex items-center p-0.5 bg-slate-800 rounded-lg text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveTab('editor')}
                  className={`px-3 py-1 rounded transition-colors ${
                    activeTab === 'editor'
                      ? 'bg-[#0088FF] text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Editor
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('tests')}
                  className={`px-3 py-1 rounded transition-colors ${
                    activeTab === 'tests'
                      ? 'bg-[#0088FF] text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Test Cases (3)
                </button>
              </div>
            </div>

            {/* Editor Workspace / Test Results Tab */}
            <div className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed bg-[#0a0f1d] text-slate-200">
              {activeTab === 'editor' ? (
                <div className="relative flex">
                  {/* Line Numbers */}
                  <div className="select-none pr-4 text-slate-600 text-right font-mono text-xs leading-relaxed">
                    {Array.from({ length: 38 }).map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  {/* Code Textarea */}
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    aria-label="Code Editor for technical assessment"
                    className="w-full h-full bg-transparent resize-none border-none outline-none font-mono text-xs leading-relaxed text-emerald-300 selection:bg-[#0088FF]/30 whitespace-pre"
                    rows={38}
                    spellCheck={false}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                    <span className="font-bold text-slate-300">Deterministic Suite Execution</span>
                    <span className="text-emerald-400 font-bold">3 / 3 Invariants Verified</span>
                  </div>

                  {testResults.map((tc) => (
                    <div key={tc.id} className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-200">{tc.name}</span>
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          Passed
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Input: <code className="text-slate-300">{tc.input}</code>
                      </div>
                      <div className="text-[11px] text-emerald-300">
                        Output: <code>{tc.expectedOutput}</code>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* REAL-TIME AI AGENT SLIDING FEEDBACK PANEL */}
            {showAIFeedback && (
              <div className="p-4 bg-slate-900 border-t border-slate-800 animate-in slide-in-from-bottom-4 duration-200 text-xs font-sans space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#00C9B1]" aria-hidden="true" />
                    <span className="font-bold text-white">AI Evaluator Feedback: Cleanliness &amp; Complexity</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    Score: 98/100 · Optimal O(N)
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  ✓ Time Complexity: O(N) linear scan over obligations. Optimal space complexity O(1) auxiliary.<br />
                  ✓ Invariant Conservation: Rounding residual correctly absorbed into final tranche, preventing floating-point leak.<br />
                  ✓ Codification Fidelity: Correctly applies ASC 606-10-32-11 variable consideration reversal constraint threshold.
                </p>
              </div>
            )}

            {/* Bottom Action Bar Anchored to Bottom Edge */}
            <div className="px-5 py-3.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Terminal className="w-3.5 h-3.5 text-[#0088FF]" />
                <span>TypeScript 5.4 · Strict Typing Active</span>
              </div>

              {/* Anchored "Run Tests" Action Button (Tech Green #7ED957) */}
              <button
                type="button"
                onClick={handleRunTests}
                disabled={isRunningTests}
                aria-label="Run test suite on current solution"
                className="px-5 py-2.5 bg-[#7ED957] hover:bg-[#6ecc48] text-[#002046] font-black rounded-lg text-xs flex items-center gap-2 transition-all shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-[#7ED957] focus-visible:outline-none disabled:opacity-50"
              >
                {isRunningTests ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-[#002046]/40 border-t-[#002046] rounded-full animate-spin" />
                    <span>Executing Suite...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-[#002046]" aria-hidden="true" />
                    <span>Run Tests &amp; Invariant Checks</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
