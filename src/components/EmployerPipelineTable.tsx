/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ShieldCheck,
  TrendingUp,
  MapPin,
  ChevronRight,
  Filter,
  ArrowUpDown,
  Search,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { Candidate } from '../types.ts';
import { MOCK_CANDIDATES } from '../data/mockCandidates.ts';

interface EmployerPipelineTableProps {
  onSelectCandidate: (candidate: Candidate) => void;
  onRequestPilot: () => void;
}

export const EmployerPipelineTable: React.FC<EmployerPipelineTableProps> = ({
  onSelectCandidate,
  onRequestPilot,
}) => {
  const [activeStage, setActiveStage] = useState<'All' | 'Vetted' | 'Interviewed' | 'Sourced'>('All');
  const [expandedRationaleId, setExpandedRationaleId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const stages = ['All', 'Vetted', 'Interviewed', 'Sourced'] as const;

  const filteredCandidates = MOCK_CANDIDATES.filter((c) => {
    const matchesStage = activeStage === 'All' || c.status === activeStage;
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStage && matchesSearch;
  });

  return (
    <section
      aria-label="Employer Talent Pipeline"
      className="py-6 sm:py-10 bg-slate-50 min-h-[calc(100vh-5rem)] border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200/80 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
              <span className="text-[#0088FF] font-bold">Dense List-View Pipeline</span>
              <span aria-hidden="true">·</span>
              <span>Replaces Kanban Boards</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#002046] tracking-tight">
              Employer Talent Pipeline
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter by name, skill, or statute..."
                aria-label="Filter pipeline candidates"
                className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0088FF] focus:ring-1 focus:ring-[#0088FF] w-56"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>

            {/* Stage filter buttons */}
            <div className="flex p-0.5 bg-white border border-slate-200 rounded-lg text-xs font-mono">
              {stages.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setActiveStage(st)}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    activeStage === st
                      ? 'bg-[#002046] text-white font-bold'
                      : 'text-slate-600 hover:text-[#002046]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dense Table Card */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" aria-label="Candidates pipeline table">
              {/* Table Header */}
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  <th scope="col" className="py-3.5 px-4 font-bold text-slate-700">Candidate / Credentials</th>
                  <th scope="col" className="py-3.5 px-4 font-bold text-slate-700">Primary Domain Practice</th>
                  <th scope="col" className="py-3.5 px-4 font-bold text-slate-700">AI Vetting Tier</th>
                  <th scope="col" className="py-3.5 px-4 font-bold text-slate-700">Status</th>
                  {/* Strictly Right-Aligned Numerical Data Columns */}
                  <th scope="col" className="py-3.5 px-4 font-bold text-slate-700 text-right">Years Exp</th>
                  <th scope="col" className="py-3.5 px-4 font-bold text-slate-700 text-right">Hourly Rate</th>
                  <th scope="col" className="py-3.5 px-4 font-bold text-slate-700 text-right">Confidence Score</th>
                  <th scope="col" className="py-3.5 px-4 text-center font-bold text-slate-700">Action</th>
                </tr>
              </thead>

              {/* Table Body with Dense Rows */}
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredCandidates.map((candidate) => {
                  const isExpanded = expandedRationaleId === candidate.id;
                  return (
                    <React.Fragment key={candidate.id}>
                      <tr className="hover:bg-slate-50/70 transition-colors group">
                        
                        {/* Candidate Name & Location */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 text-[#002046] font-bold text-xs flex items-center justify-center shrink-0">
                              {candidate.name.charAt(0)}
                            </div>
                            <div>
                              <div
                                onClick={() => onSelectCandidate(candidate)}
                                className="font-bold text-[#002046] hover:text-[#0088FF] transition-colors cursor-pointer"
                              >
                                {candidate.name}
                              </div>
                              <div className="text-[11px] text-slate-500 flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-slate-400" />
                                <span>{candidate.location}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Domain / Role */}
                        <td className="py-3.5 px-4 max-w-xs">
                          <div className="font-semibold text-slate-700 truncate">{candidate.role}</div>
                          <div className="text-[11px] font-mono text-slate-400 truncate">
                            {candidate.skills.slice(0, 2).join(' · ')}
                          </div>
                        </td>

                        {/* AI Vetting Tier */}
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                            <ShieldCheck className="w-3 h-3 text-[#0088FF]" />
                            <span>{candidate.aiVerificationBadge.tier}</span>
                          </span>
                        </td>

                        {/* Stage Status */}
                        <td className="py-3.5 px-4 font-mono">
                          <span className="text-[11px] font-bold text-slate-700 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                            {candidate.status}
                          </span>
                        </td>

                        {/* STRICTLY RIGHT-ALIGNED: Years of Experience */}
                        <td className="py-3.5 px-4 text-right font-mono text-xs tabular-nums text-slate-700">
                          {candidate.yearsExperience} yrs
                        </td>

                        {/* STRICTLY RIGHT-ALIGNED: Hourly Rate */}
                        <td className="py-3.5 px-4 text-right font-mono text-xs tabular-nums font-bold text-[#002046]">
                          ${candidate.rate}/hr
                        </td>

                        {/* STRICTLY RIGHT-ALIGNED: Confidence Score with Tooltip Trigger */}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => setExpandedRationaleId(isExpanded ? null : candidate.id)}
                            aria-label={`Toggle confidence rationale for ${candidate.name}`}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
                          >
                            <TrendingUp className="w-3 h-3 text-[#7ED957]" />
                            <span className="tabular-nums">{candidate.matchScore}%</span>
                          </button>
                        </td>

                        {/* Action CTA */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => onSelectCandidate(candidate)}
                            aria-label={`Open scorecard for ${candidate.name}`}
                            className="p-1 text-slate-400 hover:text-[#0088FF] rounded transition-colors cursor-pointer"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </td>

                      </tr>

                      {/* Expandable Confidence Score Rationale Row */}
                      {isExpanded && (
                        <tr className="bg-slate-50/90 border-b border-slate-200">
                          <td colSpan={8} className="p-4 sm:p-5">
                            <div className="max-w-2xl bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
                              <div className="flex items-center justify-between text-xs font-bold border-b border-slate-100 pb-2">
                                <span className="text-[#002046]">
                                  AI Match Rationale Breakdown: {candidate.name}
                                </span>
                                <span className="font-mono text-emerald-700">{candidate.matchScore}% Confidence</span>
                              </div>

                              {/* Minimalist horizontal bar charts */}
                              <div className="space-y-2.5 font-mono text-[11px]">
                                {candidate.matchRationale.map((rat, rIdx) => (
                                  <div key={rIdx} className="space-y-1">
                                    <div className="flex justify-between text-slate-600">
                                      <span>{rat.dimension}</span>
                                      <span className="tabular-nums font-bold text-[#002046]">{rat.score}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                      <div
                                        className="bg-[#0088FF] h-full rounded-full"
                                        style={{ width: `${rat.score}%` }}
                                      />
                                    </div>
                                    <p className="text-[10px] text-slate-500 font-sans italic">
                                      {rat.detail}
                                    </p>
                                  </div>
                                ))}
                              </div>

                              <div className="pt-2 flex justify-end">
                                <button
                                  type="button"
                                  onClick={() => onSelectCandidate(candidate)}
                                  className="text-xs font-bold text-[#0088FF] hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                  <span>View Complete Vetted Scorecard</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
