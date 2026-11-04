/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Database, FileCode, Check, Copy } from 'lucide-react';

export const DatasetSchemaSection: React.FC = () => {
  const [viewFormat, setViewFormat] = useState<'parquet' | 'jsonl'>('jsonl');
  const [copied, setCopied] = useState(false);

  const jsonlSample = `{
  "trajectory_id": "NVX-2026-ASC606-00492",
  "domain": "technical_accounting",
  "governing_standard": "FASB ASC 606-10-32-29",
  "annotator_pedigree": {
    "credential": "CPA_LICENSED",
    "state_board": "CA_BOARD_OF_ACCOUNTANCY",
    "prior_firm_tier": "BIG_FOUR",
    "years_experience": 12
  },
  "prompt": "Determine relative standalone selling price allocation for $420k multi-element contract with Day 60 API delivery...",
  "thought_chain": [
    {
      "step_index": 1,
      "objective": "Identify distinct performance obligations",
      "codification": "ASC 606-10-25-14",
      "scratchpad": "PO1: SaaS (stand-ready); PO2: Custom API (distinct utility).",
      "invariant_verified": true
    },
    {
      "step_index": 2,
      "objective": "Variable consideration constraint evaluation",
      "codification": "ASC 606-10-32-11",
      "scratchpad": "P(uptime >= 99.95%) = 0.98. Constraint satisfied; transaction_price = 420000.00",
      "invariant_verified": true
    },
    {
      "step_index": 3,
      "objective": "Relative Standalone Selling Price allocation",
      "codification": "ASC 606-10-32-29",
      "math_derivation": {
        "ssp_total": 420000.00,
        "saas_ratio": 350000.00 / 420000.00,
        "api_ratio": 70000.00 / 420000.00,
        "allocated_saas": 350000.00,
        "allocated_api": 70000.00,
        "sum_check": 420000.00
      },
      "invariant_verified": true
    }
  ],
  "qa_gatekeeping": {
    "symbolic_solver_pass": true,
    "multi_judge_consensus_score": 0.992,
    "statutory_citation_verified": true,
    "human_verified_stamp": "VERIFIED_AUDIT_READY"
  }
}`;

  const parquetSchema = `message NuvonixReasoningTrajectory {
  required binary trajectory_id (STRING);
  required binary domain (STRING);
  required binary governing_standard (STRING);
  
  group annotator_provenance {
    required binary credential (STRING);
    required binary licensing_authority (STRING);
    required int32 years_experience;
  }
  
  required binary raw_prompt (STRING);
  
  repeated group reasoning_steps {
    required int32 step_index;
    required binary objective (STRING);
    required binary codification_citation (STRING);
    optional binary calculation_scratchpad (STRING);
    required boolean invariant_preserved;
  }
  
  group validation_telemetry {
    required boolean symbolic_identity_balanced;
    required double multi_judge_consensus_score;
    required binary human_provenance_hash (STRING);
  }
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(viewFormat === 'jsonl' ? jsonlSample : parquetSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="dataset-formats"
      aria-labelledby="schema-section-title"
      className="py-16 sm:py-24 bg-white border-b border-slate-200/90"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            <span className="text-[#0088FF]">Enterprise Delivery Pipeline</span>
            <span aria-hidden="true">·</span>
            <span>Frontier Model Ingestion</span>
          </div>

          <h2
            id="schema-section-title"
            className="text-3xl sm:text-4xl font-black text-[#001F3F] tracking-tight leading-tight mb-4"
          >
            Engineered for Frontier Model Tokenizers
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            Nuvonix datasets export directly into production pre-tokenized JSONL and Apache Parquet formats,
            equipped with step-level thought scratchpads and invariant validation telemetry.
          </p>
        </div>

        {/* Schema Viewer Terminal */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-slate-300 bg-slate-900 text-slate-100 shadow-xl overflow-hidden">
          
          {/* Terminal Title Bar */}
          <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="w-3 h-3 rounded-full bg-slate-700 inline-block" />
                <span className="w-3 h-3 rounded-full bg-slate-700 inline-block" />
                <span className="w-3 h-3 rounded-full bg-slate-700 inline-block" />
              </div>
              <span className="text-xs font-mono text-slate-400">
                schema_spec.{viewFormat === 'jsonl' ? 'jsonl' : 'parquet'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Format Switcher */}
              <div className="flex items-center p-0.5 bg-slate-800 rounded-lg text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setViewFormat('jsonl')}
                  aria-label="View Tokenized JSONL Schema"
                  className={`px-3 py-1 rounded-md transition-colors ${
                    viewFormat === 'jsonl'
                      ? 'bg-[#0088FF] text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  JSONL
                </button>
                <button
                  type="button"
                  onClick={() => setViewFormat('parquet')}
                  aria-label="View Apache Parquet Schema"
                  className={`px-3 py-1 rounded-md transition-colors ${
                    viewFormat === 'parquet'
                      ? 'bg-[#0088FF] text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Parquet
                </button>
              </div>

              {/* Copy button */}
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy schema sample to clipboard"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-[#0088FF] focus-visible:outline-none"
              >
                {copied ? <Check className="w-4 h-4 text-[#7ED957]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Code Window */}
          <div className="p-5 sm:p-6 overflow-x-auto text-xs font-mono leading-relaxed bg-[#0a0f1d] max-h-[460px]">
            <pre className="text-emerald-300">
              <code>{viewFormat === 'jsonl' ? jsonlSample : parquetSchema}</code>
            </pre>
          </div>

          {/* Terminal Footer */}
          <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Directly compatible with SFT, DPO, and RLHF pipelines</span>
            <span className="text-[#00C9B1]">Zero Synthetic Contamination Guarantee</span>
          </div>

        </div>

      </div>
    </section>
  );
};
