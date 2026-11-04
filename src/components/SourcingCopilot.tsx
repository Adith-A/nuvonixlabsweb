/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Send,
  SlidersHorizontal,
  ShieldCheck,
  MapPin,
  Clock,
  ArrowRight,
  TrendingUp,
  Award,
  ChevronRight,
  Info,
  Check,
  Bot,
  User,
  Zap,
} from 'lucide-react';
import { Candidate } from '../types.ts';
import { MOCK_CANDIDATES } from '../data/mockCandidates.ts';

interface SourcingCopilotProps {
  onSelectCandidate: (candidate: Candidate) => void;
  onRequestPilot: () => void;
}

interface ChatQuery {
  id: string;
  sender: 'employer' | 'copilot';
  text: string;
  timestamp: string;
  activeFilter?: string;
}

export const SourcingCopilot: React.FC<SourcingCopilotProps> = ({
  onSelectCandidate,
  onRequestPilot,
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string | null>(null);
  const [hoveredCandidateScore, setHoveredCandidateScore] = useState<string | null>(null);

  const [conversation, setConversation] = useState<ChatQuery[]>([
    {
      id: 'c-1',
      sender: 'copilot',
      text: 'Nuvonix Sourcing Copilot initialized. I have indexed 840+ pre-vetted fellows across Technical Accounting (ASC 606/842), Corporate M&A Law (DGCL), and Distributed Systems Infrastructure.\n\nType your hiring requirements or click a query chip below to search against live candidate trajectories.',
      timestamp: 'Just now',
    },
  ]);

  const suggestionChips = [
    'Big-4 CPA for ASC 606 multi-element revenue recognition',
    'AmLaw 100 Corporate Counsel with Delaware M&A MAE expertise',
    'Staff Systems Architect with distributed Arrow / vLLM experience',
    'ASC 740 Tax Fellow with valuation allowance background',
  ];

  // Filtering candidates based on query or active filter
  const filteredCandidates = MOCK_CANDIDATES.filter((cand) => {
    if (selectedSkillFilter) {
      return cand.skills.some((s) => s.toLowerCase().includes(selectedSkillFilter.toLowerCase()));
    }
    return true;
  });

  const handleSendPrompt = (promptText: string) => {
    if (!promptText.trim()) return;

    const userMsg: ChatQuery = {
      id: `usr-${Date.now()}`,
      sender: 'employer',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setConversation((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsMatching(true);

    // AI matching shimmer transition
    setTimeout(() => {
      let filterTag = '';
      let reply = '';

      const lower = promptText.toLowerCase();
      if (lower.includes('cpa') || lower.includes('asc 606') || lower.includes('accounting')) {
        filterTag = 'ASC 606';
        reply = 'Found 2 candidates matching Technical Accounting & ASC 606 with >95% benchmark confidence. Top match: Alexandra Vance, CPA (PwC Alum, 1,200+ verified training trajectories).';
      } else if (lower.includes('law') || lower.includes('m&a') || lower.includes('delaware') || lower.includes('counsel')) {
        filterTag = 'Delaware Corporate Law';
        reply = 'Identified Marcus Sterling, JD (Former Latham & Watkins Senior Associate, Delaware Chancery clerk). Top match for MAE dispute modeling and reps & warranties.';
      } else if (lower.includes('architect') || lower.includes('system') || lower.includes('rust') || lower.includes('vllm')) {
        filterTag = 'Distributed';
        reply = 'Matched Elena Rostova (Ex-Stripe Staff Systems Engineer). Verified in lock-free ring buffers, zero-copy Arrow IPC, and GPU evaluation harnesses.';
      } else {
        reply = 'Ranked all available vetted practitioners against your query parameters. Filtered by invariant preservation score and verification tier.';
      }

      const copilotReply: ChatQuery = {
        id: `cop-${Date.now()}`,
        sender: 'copilot',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        activeFilter: filterTag,
      };

      setConversation((prev) => [...prev, copilotReply]);
      if (filterTag) setSelectedSkillFilter(filterTag);
      setIsMatching(false);
    }, 850);
  };

  return (
    <section
      aria-label="Sourcing Copilot Workspace"
      className="py-6 sm:py-10 bg-slate-50 min-h-[calc(100vh-5rem)] border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Workspace Title & Live Telemetry Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-slate-200/80 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
              <span className="text-[#0088FF] font-bold">Mercor-Style AI Sourcing</span>
              <span aria-hidden="true">·</span>
              <span>Autonomous Vetting Copilot</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#002046] tracking-tight">
              Talent Sourcing Copilot
            </h1>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
              <span className="text-slate-600">Index: <strong className="text-[#002046]">840 Fellows</strong></span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
              <span className="text-slate-600">Verification: <strong className="text-emerald-700">100% Licensed</strong></span>
            </div>
          </div>
        </div>

        {/* Core Split-Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Pane (The Prompt): Conversational Interface */}
          <div className="lg:col-span-5 bg-white rounded-xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs flex flex-col h-[640px] justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0088FF]">
                    <Sparkles className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-[#002046]">Conversational Sourcing</h2>
                    <p className="text-[11px] text-slate-500">Natural Language Parameter Tuning</p>
                  </div>
                </div>
                {selectedSkillFilter && (
                  <button
                    type="button"
                    onClick={() => setSelectedSkillFilter(null)}
                    className="text-[11px] font-mono text-slate-500 hover:text-red-600 underline cursor-pointer"
                  >
                    Clear Filter ({selectedSkillFilter})
                  </button>
                )}
              </div>

              {/* Chat Message Stream */}
              <div
                className="overflow-y-auto max-h-[340px] space-y-3.5 pr-1 text-xs"
                role="log"
                aria-label="Sourcing Copilot dialogue transcript"
              >
                {conversation.map((msg) => {
                  const isCopilot = msg.sender === 'copilot';
                  return (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-2.5 ${isCopilot ? 'justify-start' : 'justify-end'}`}
                    >
                      {isCopilot && (
                        <div
                          aria-hidden="true"
                          className="w-7 h-7 rounded-md bg-slate-100 text-[#002046] flex items-center justify-center shrink-0 mt-0.5 border border-slate-200"
                        >
                          <Bot className="w-3.5 h-3.5 text-[#0088FF]" />
                        </div>
                      )}
                      <div className="max-w-[85%]">
                        <div
                          className={`p-3.5 rounded-xl leading-relaxed whitespace-pre-wrap ${
                            isCopilot
                              ? 'bg-slate-50 text-slate-900 border border-slate-200/90'
                              : 'bg-[#0088FF] text-white'
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono mt-1 block px-1">
                          {msg.sender === 'copilot' ? 'Copilot' : 'Employer'} · {msg.timestamp}
                        </span>
                      </div>
                      {!isCopilot && (
                        <div
                          aria-hidden="true"
                          className="w-7 h-7 rounded-md bg-[#002046] text-white flex items-center justify-center shrink-0 mt-0.5"
                        >
                          <User className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Shimmer state inside chat */}
                {isMatching && (
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-slate-100 text-[#002046] flex items-center justify-center shrink-0 mt-0.5 border border-slate-200">
                      <Bot className="w-3.5 h-3.5 text-[#0088FF]" />
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-[#0088FF]/30 border-t-[#0088FF] rounded-full animate-spin" />
                      <span>Matching against 840+ candidate skill radars &amp; interview transcripts...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input & Contextual Suggestion Chips */}
            <div className="pt-3 border-t border-slate-100 space-y-3">
              {/* Contextual Chips */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Suggested Prompt Queries:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {suggestionChips.map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendPrompt(chip)}
                      aria-label={`Send suggested query: ${chip}`}
                      className="px-2.5 py-1 rounded-md text-[11px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 transition-colors text-left focus-visible:ring-2 focus-visible:ring-[#0088FF] focus-visible:outline-none cursor-pointer"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendPrompt(inputQuery);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="e.g. Find senior CPA with ASC 606 or Big Law M&A attorney..."
                  aria-label="Type natural language sourcing prompt"
                  className="flex-1 px-3.5 py-2.5 text-xs text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0088FF] focus:ring-2 focus:ring-[#0088FF]/20 focus-visible:outline-none transition-all placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  aria-label="Send sourcing prompt to AI copilot"
                  className="px-4 py-2.5 bg-[#0088FF] hover:bg-[#0077e6] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0088FF] focus-visible:outline-none"
                >
                  <span>Query</span>
                  <Send className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Pane (Dynamic Results): Bento Box Candidate Grid */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Results Header */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 px-1">
              <div>
                <span>Matching Candidates: </span>
                <strong className="text-[#002046] tabular-nums">{filteredCandidates.length} Fellows</strong>
              </div>
              <span>Sorted by Algorithmic Confidence Score</span>
            </div>

            {/* AI Shimmer Loading State */}
            {isMatching ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-slate-100 to-transparent" />
                    <div className="h-4 bg-slate-200 rounded w-2/3" />
                    <div className="h-3 bg-slate-100 rounded w-1/2" />
                    <div className="h-12 bg-slate-100 rounded w-full" />
                    <div className="flex gap-2 pt-2">
                      <div className="h-5 bg-slate-200 rounded w-16" />
                      <div className="h-5 bg-slate-200 rounded w-20" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCandidates.map((candidate) => (
                  <article
                    key={candidate.id}
                    onClick={() => onSelectCandidate(candidate)}
                    className="group bg-white rounded-xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 hover:scale-[1.01] cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Row: AI Verification Badge & Score */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-[#002046]">
                            {candidate.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-[#002046] tracking-tight group-hover:text-[#0088FF] transition-colors">
                              {candidate.name}
                            </h3>
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                              <MapPin className="w-3 h-3 text-slate-400" aria-hidden="true" />
                              <span>{candidate.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Confidence Score Pill with Right-Aligned Monospace Numerals */}
                        <div className="relative text-right">
                          <button
                            type="button"
                            onMouseEnter={() => setHoveredCandidateScore(candidate.id)}
                            onMouseLeave={() => setHoveredCandidateScore(null)}
                            aria-label={`Match Confidence: ${candidate.matchScore} percent. Hover for breakdown.`}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold"
                          >
                            <TrendingUp className="w-3 h-3 text-[#7ED957]" aria-hidden="true" />
                            <span className="tabular-nums">{candidate.matchScore}%</span>
                          </button>

                          {/* Hover Tooltip Breakdown */}
                          {hoveredCandidateScore === candidate.id && (
                            <div className="absolute right-0 top-8 z-30 w-64 p-3 bg-slate-900 text-white rounded-xl shadow-xl text-left text-xs font-sans space-y-2 animate-in fade-in zoom-in-95">
                              <div className="font-bold border-b border-slate-800 pb-1 flex items-center justify-between">
                                <span>Match Rationale</span>
                                <span className="font-mono text-emerald-400">{candidate.matchScore}%</span>
                              </div>
                              <div className="space-y-1.5 font-mono text-[10px]">
                                {candidate.matchRationale.map((rat, rIdx) => (
                                  <div key={rIdx}>
                                    <div className="flex justify-between text-slate-300">
                                      <span>{rat.dimension}</span>
                                      <span className="tabular-nums">{rat.score}%</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-1 rounded overflow-hidden mt-0.5">
                                      <div
                                        className="bg-[#0088FF] h-full rounded"
                                        style={{ width: `${rat.score}%` }}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Role & Verification Badge */}
                      <p className="text-xs font-semibold text-slate-700 mb-2 leading-snug">
                        {candidate.role}
                      </p>

                      <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 mb-3">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#0088FF]" aria-hidden="true" />
                        <span>AI Verified: {candidate.aiVerificationBadge.tier}</span>
                      </div>

                      {/* Summary */}
                      <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                        {candidate.summary}
                      </p>

                      {/* Technical Skills */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {candidate.skills.slice(0, 3).map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-700 border border-slate-200"
                          >
                            {skill}
                          </span>
                        ))}
                        {candidate.skills.length > 3 && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-500">
                            +{candidate.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Metadata: Right-aligned numerical data (Rate, Years) */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="text-slate-500 font-mono text-[11px]">
                        <span>Exp: </span>
                        <strong className="text-[#002046] tabular-nums">{candidate.yearsExperience} yrs</strong>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="font-mono text-[11px] text-right">
                          <span className="text-slate-500">Rate: </span>
                          <strong className="text-[#002046] tabular-nums">${candidate.rate}/hr</strong>
                        </div>

                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0088FF] group-hover:translate-x-0.5 transition-transform">
                          <span>Scorecard</span>
                          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Bottom Sourcing Assistance Banner */}
            <div className="p-4 bg-white rounded-xl border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-600">
                Need a custom cohort of specialized tax partners or AmLaw 100 counsel?
              </span>
              <button
                type="button"
                onClick={onRequestPilot}
                className="px-3.5 py-1.5 bg-[#002046] text-white rounded-lg font-bold hover:bg-slate-800 transition-colors shrink-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0088FF] focus-visible:outline-none"
              >
                Request Custom Cohort
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
