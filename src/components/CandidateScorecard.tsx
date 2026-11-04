/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ShieldCheck,
  MapPin,
  Clock,
  Play,
  Pause,
  Volume2,
  Calendar,
  CheckCircle2,
  ArrowLeft,
  Share2,
  Bookmark,
  TrendingUp,
  FileCheck2,
  Sparkles,
} from 'lucide-react';
import { Candidate } from '../types.ts';
import { SkillRadarChart } from './SkillRadarChart.tsx';

interface CandidateScorecardProps {
  candidate: Candidate;
  onBack: () => void;
  onRequestPilot: () => void;
}

export const CandidateScorecard: React.FC<CandidateScorecardProps> = ({
  candidate,
  onBack,
  onRequestPilot,
}) => {
  const [activeSnippetIndex, setActiveSnippetIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeSnippet = candidate.interviewSnippets[activeSnippetIndex] || candidate.interviewSnippets[0];

  return (
    <section
      aria-label={`AI Vetted Scorecard for ${candidate.name}`}
      className="py-6 sm:py-10 bg-slate-50 min-h-[calc(100vh-5rem)] border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Navigation Breadcrumb & Back action */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            aria-label="Return to candidate search and copilot"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#002046] transition-colors p-1 rounded-lg focus-visible:ring-2 focus-visible:ring-[#0088FF] focus-visible:outline-none cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Sourcing Copilot</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">ID: {candidate.id.toUpperCase()}</span>
            <button
              type="button"
              onClick={onRequestPilot}
              aria-label="Request candidate deployment"
              className="px-4 py-2 bg-[#0088FF] hover:bg-[#0077e6] text-white rounded-lg text-xs font-bold transition-colors shadow-2xs focus-visible:ring-2 focus-visible:ring-[#0088FF] focus-visible:outline-none cursor-pointer"
            >
              Request Candidate Deployment
            </button>
          </div>
        </div>

        {/* 1. HERO SECTION (Bento 2x1 Card) */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#002046] text-white flex items-center justify-center text-2xl font-black shrink-0 shadow-xs">
                {candidate.name.charAt(0)}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-black text-[#002046] tracking-tight">
                    {candidate.name}
                  </h1>

                  {/* Prominent AI Verification Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-[#0088FF] text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-[#0088FF]" aria-hidden="true" />
                    <span>AI Vetted: {candidate.aiVerificationBadge.tier}</span>
                    <span className="text-slate-400 font-mono text-[10px]">({candidate.aiVerificationBadge.date})</span>
                  </div>
                </div>

                <p className="text-sm font-semibold text-slate-700">
                  {candidate.role}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                    {candidate.location}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                    Immediate Deployment Available
                  </span>
                </div>
              </div>
            </div>

            {/* Strictly Right-Aligned Numbers (Rate, Experience, Match) */}
            <div className="flex items-center gap-6 text-right font-mono self-end md:self-auto">
              <div className="border-r border-slate-100 pr-6">
                <div className="text-xs text-slate-400 uppercase">Hourly Rate</div>
                <div className="text-2xl font-black text-[#002046] tabular-nums">${candidate.rate}</div>
                <div className="text-[10px] text-slate-500">USD / hr</div>
              </div>
              <div className="border-r border-slate-100 pr-6">
                <div className="text-xs text-slate-400 uppercase">Experience</div>
                <div className="text-2xl font-black text-[#002046] tabular-nums">{candidate.yearsExperience} yrs</div>
                <div className="text-[10px] text-slate-500">Verified Practice</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase">AI Match</div>
                <div className="text-2xl font-black text-emerald-800 tabular-nums">{candidate.matchScore}%</div>
                <div className="text-[10px] text-emerald-600 font-bold">Top Decile</div>
              </div>
            </div>
          </div>

          {/* Candidate Summary */}
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-5">
            {candidate.summary}
          </p>

          {/* Skill Tag Strip */}
          <div className="flex flex-wrap gap-2 pt-4">
            {candidate.skills.map((skill, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-100 text-slate-800 border border-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* 2. BENTO BOX MAIN ROW: Skill Radar + Match Dimensions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Skill Radar Chart Card (lg:col-span-6) */}
          <div className="lg:col-span-6 bg-white rounded-xl p-6 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#0088FF]" aria-hidden="true" />
                  <h2 className="text-sm font-bold text-[#002046]">AI Skill Radar</h2>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Normalized Deciles</span>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Geometric competency map across technical invariants, speed, debugging, and system design.
              </p>
            </div>

            <div className="py-2 flex items-center justify-center">
              <SkillRadarChart scores={candidate.radarScores} size={310} />
            </div>

            <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className="p-2 bg-slate-50 rounded-lg">
                <div className="text-slate-400 text-[10px]">Architecture</div>
                <div className="font-bold text-[#002046] tabular-nums">{candidate.radarScores.architecture}%</div>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg">
                <div className="text-slate-400 text-[10px]">Invariants</div>
                <div className="font-bold text-emerald-800 tabular-nums">{candidate.radarScores.invariants}%</div>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg">
                <div className="text-slate-400 text-[10px]">Debugging</div>
                <div className="font-bold text-[#002046] tabular-nums">{candidate.radarScores.debugging}%</div>
              </div>
            </div>
          </div>

          {/* Match Rationale & Invariant Confidence (lg:col-span-6) */}
          <div className="lg:col-span-6 bg-white rounded-xl p-6 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#00C9B1]" aria-hidden="true" />
                  <h2 className="text-sm font-bold text-[#002046]">Algorithmic Match Rationale</h2>
                </div>
                <span className="text-[11px] font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {candidate.matchScore}% Overall Fit
                </span>
              </div>

              <div className="space-y-4">
                {candidate.matchRationale.map((rat, rIndex) => (
                  <div key={rIndex} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">{rat.dimension}</span>
                      <span className="font-mono font-bold text-[#0088FF] tabular-nums">{rat.score}%</span>
                    </div>
                    {/* Minimalist horizontal bar chart */}
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#0088FF] h-full rounded-full transition-all duration-500"
                        style={{ width: `${rat.score}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-600 leading-normal">
                      {rat.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 p-3 bg-slate-50 rounded-lg text-xs text-slate-600 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#7ED957] shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                All reasoning traces have passed automated symbolic AST checks with zero hallmarked contradictions.
              </span>
            </div>
          </div>

        </div>

        {/* 3. INTERVIEW PLAYBACK MODULE (Media module with transcribed chapters) */}
        <div className="bg-white rounded-xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#7ED957]">
                <Play className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#002046]">AI Technical Interview Playback</h2>
                <p className="text-[11px] text-slate-500">Autonomous Proctor Session · Automatically Transcribed &amp; Chaptered</p>
              </div>
            </div>

            {/* Chapters navigation */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
              {candidate.interviewSnippets.map((snip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveSnippetIndex(idx);
                    setIsPlaying(true);
                  }}
                  aria-label={`Jump to chapter: ${snip.chapter}`}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    activeSnippetIndex === idx
                      ? 'bg-[#002046] text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {snip.timestamp} · {snip.chapter.slice(0, 18)}...
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Player Mockup */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Player Screen & Waveform (lg:col-span-5) */}
            <div className="lg:col-span-5 bg-slate-950 text-white rounded-xl p-5 space-y-4">
              <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden border border-slate-800">
                <div className="text-center space-y-2 z-10">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto text-[#0088FF]">
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                  </div>
                  <div className="text-xs font-mono text-slate-300">
                    Proctoring Stream: {candidate.name.split(',')[0]}
                  </div>
                </div>
                {/* Visualizer bars */}
                <div className="absolute inset-x-0 bottom-2 flex items-end justify-center gap-1 h-8 opacity-40">
                  {[20, 45, 80, 60, 90, 40, 75, 30, 85, 95, 50, 70, 40, 60, 30, 90].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 bg-[#0088FF] rounded-full transition-all duration-150"
                      style={{ height: isPlaying ? `${(h * Math.random() + 20)}%` : `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Player Controls */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <span>{activeSnippet.timestamp} / {activeSnippet.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="text-[10px]">1.0x</span>
                </div>
              </div>
            </div>

            {/* Right Transcribed Snippet & AI Evaluation (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-[#0088FF]">Proctor Question:</span>
                  <span className="text-slate-400">Chapter {activeSnippetIndex + 1}</span>
                </div>
                <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                  &ldquo;{activeSnippet.question}&rdquo;
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-slate-700">Verbatim Candidate Trajectory:</span>
                  <span className="text-emerald-700 font-bold">Verified Audio Match</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic bg-slate-50/70 p-3 rounded-lg border border-slate-100">
                  &ldquo;{activeSnippet.responseExcerpt}&rdquo;
                </p>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#00C9B1] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-bold">AI Evaluator Note: </span>
                  <span>{activeSnippet.aiInsight}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4. TIMELINE VIEW (Vertical progression stripping fluff, highlighting impact) */}
        <div className="bg-white rounded-xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#0088FF]" aria-hidden="true" />
              <h2 className="text-sm font-bold text-[#002046]">Quantifiable Career Progression</h2>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Algorithmically Stripped of Fluff</span>
          </div>

          <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {candidate.timeline.map((item, tIdx) => (
              <div key={tIdx} className="relative group">
                {/* Timeline node */}
                <span className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white bg-[#0088FF] shadow-2xs" />
                
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-[#002046]">
                      {item.title} · <span className="text-slate-600">{item.company}</span>
                    </h3>
                    <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded">
                      {item.period}
                    </span>
                  </div>

                  {/* Impact metrics */}
                  <ul className="space-y-1.5 pt-2 text-xs text-slate-600">
                    {item.impactMetrics.map((metric, mIdx) => (
                      <li key={mIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#7ED957] shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="leading-relaxed font-sans">{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
