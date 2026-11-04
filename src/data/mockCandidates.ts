/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Candidate, AssessmentScenario } from '../types.ts';

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Alexandra Vance, CPA',
    role: 'Senior Technical Accounting Lead & AI Trajectory Fellow',
    location: 'San Francisco, CA (Remote)',
    rate: 165,
    yearsExperience: 11,
    matchScore: 98,
    aiVerificationBadge: {
      verified: true,
      tier: 'Tier 1 Fellow',
      date: 'Oct 2026',
    },
    skills: ['ASC 606 Multi-Element', 'SEC 10-K Auditing', 'Python Invariant Solvers', 'FASB Codification', 'M&A Due Diligence'],
    summary:
      'Former PwC Senior Audit Manager & Director of Technical Accounting. Audited Fortune 100 cloud contracts and authored 400+ deterministic ASC 606 step-by-step training trajectories.',
    status: 'Vetted',
    matchRationale: [
      { dimension: 'Domain Invariant Mastery', score: 99, detail: 'Zero deviation on relative Standalone Selling Price allocation across 14 edge scenarios.' },
      { dimension: 'Codification Precision', score: 98, detail: 'Accurately cited FASB ASC 606-10-32-11 reversal constraints in under 45 seconds.' },
      { dimension: 'Reasoning Trajectory Density', score: 96, detail: 'Average chain-of-thought step depth of 8.4 steps with explicit calculation scratchpads.' },
      { dimension: 'Communication & Cleanliness', score: 97, detail: 'Concise executive memo style with structured markdown tabular presentations.' },
    ],
    radarScores: {
      architecture: 96,
      speed: 92,
      communication: 98,
      debugging: 95,
      invariants: 99,
      systemDesign: 94,
    },
    interviewSnippets: [
      {
        timestamp: '03:14',
        chapter: 'ASC 606 Variable Consideration Constraint',
        question: 'Under what conditions does an SLA rebate trigger a variable consideration deduction on Day 1?',
        responseExcerpt: 'Under ASC 606-10-32-11, variable consideration is included only to the extent that it is highly probable a significant reversal will not occur. If historical telemetry proves 98% SLA compliance, deducting the rebate upfront produces an inverted liability on the balance sheet.',
        aiInsight: 'Demonstrates immediate recognition of balance sheet conservation identities without prompting.',
        duration: '1m 45s',
      },
      {
        timestamp: '14:22',
        chapter: 'Standalone Selling Price (SSP) Hierarchy',
        question: 'How do you establish SSP when neither observable standalone sales nor competitor pricing exists?',
        responseExcerpt: 'You apply the adjusted market assessment approach or the expected cost plus a margin approach. The residual approach is strictly restricted under ASC 606-10-32-34 and only permitted when selling price is highly variable or uncertain.',
        aiInsight: 'Identified the residual approach exception boundary flawlessly.',
        duration: '2m 10s',
      },
      {
        timestamp: '26:50',
        chapter: 'Automated Rule-Engine Gatekeeping',
        question: 'How do you translate accounting rules into deterministic programmatic asserts?',
        responseExcerpt: 'Every journal entry is modeled as an invariant matrix: the sum of debits minus credits must evaluate to exactly zero at floating point precision, and cumulative recognized revenue across all periods cannot exceed the transaction price ceiling.',
        aiInsight: 'Rare dual competence in high-stakes auditing and symbolic verification logic.',
        duration: '2m 05s',
      },
    ],
    timeline: [
      {
        period: '2023 — Present',
        company: 'Nuvonix Labs',
        title: 'Senior Technical Accounting Fellow',
        impactMetrics: [
          'Generated 1,200+ audit-ready training trajectories for frontier reasoning models with zero invariant breaches.',
          'Formulated benchmark rubrics for ASC 606 and ASC 842 adopted across top-3 AI evaluation suites.',
        ],
      },
      {
        period: '2018 — 2023',
        company: 'Cloudflare / Enterprise Tech',
        title: 'Director of Technical Accounting',
        impactMetrics: [
          'Led multi-element revenue recognition for $900M+ ARR across 12,000 enterprise contracts.',
          'Reduced audit cycle closure time by 34% through automated invariant reconciliation.',
        ],
      },
      {
        period: '2015 — 2018',
        company: 'PricewaterhouseCoopers (PwC)',
        title: 'Senior Audit Manager',
        impactMetrics: [
          'Managed Big-4 audit engagements for 4 Fortune 500 public technology clients.',
          'Zero audit deficiencies reported across SEC inspections.',
        ],
      },
    ],
  },
  {
    id: 'cand-2',
    name: 'Marcus Sterling, JD',
    role: 'Corporate M&A Counsel & Legal Reasoning Evaluator',
    location: 'New York, NY (Hybrid)',
    rate: 190,
    yearsExperience: 14,
    matchScore: 95,
    aiVerificationBadge: {
      verified: true,
      tier: 'Top 1% Senior',
      date: 'Sep 2026',
    },
    skills: ['Delaware Corporate Law (DGCL)', 'M&A MAE Provisions', 'Cross-Border Indemnity', 'Sandbagging Clauses', 'HSR Antitrust'],
    summary:
      'Former Latham & Watkins Senior Associate and Delaware Chancery Court clerk. Expert in Material Adverse Effect (MAE) termination standards, reps & warranties insurance, and disclosure schedule edge cases.',
    status: 'Vetted',
    matchRationale: [
      { dimension: 'Chancery Precedent Alignment', score: 98, detail: 'Flawless durational significance application under Akorn v. Fresenius and In re IBP.' },
      { dimension: 'Contract Boundary Mapping', score: 96, detail: 'Strict separation of post-closing indemnity rights versus pre-closing conditions.' },
      { dimension: 'Edge-Case Disproportionate Impact', score: 94, detail: 'Accurately articulated plant-specific regulatory exclusions in pharmaceutical transactions.' },
      { dimension: 'Drafting Precision', score: 93, detail: 'Identifies latent ambiguities in seller representation definitions in real-time.' },
    ],
    radarScores: {
      architecture: 94,
      speed: 89,
      communication: 97,
      debugging: 96,
      invariants: 98,
      systemDesign: 90,
    },
    interviewSnippets: [
      {
        timestamp: '05:40',
        chapter: 'Akorn Durational Significance Test',
        question: 'What constitutes durational significance when a target suffers a short-term quarterly revenue collapse?',
        responseExcerpt: 'Under Delaware law, short-term earnings hiccups do not satisfy an MAE. The buyer must show the target’s earning power has been impaired over a commercially reasonable period measured in years, not fiscal quarters.',
        aiInsight: 'Directly applied Vice Chancellor Laster’s benchmark reasoning.',
        duration: '2m 15s',
      },
      {
        timestamp: '19:10',
        chapter: 'Pro-Sandbagging vs Closing Conditions',
        question: 'Does an express pro-sandbagging clause excuse a buyer from closing if they had pre-signing knowledge?',
        responseExcerpt: 'No. Sandbagging clauses govern damages claims under post-closing indemnification. They do not rewrite objective closing conditions negotiated in Section 6.2(a).',
        aiInsight: 'Avoided the classic trap that confuses generalist evaluators.',
        duration: '1m 55s',
      },
    ],
    timeline: [
      {
        period: '2022 — Present',
        company: 'Nuvonix Legal Practice',
        title: 'Lead Legal Reasoning Proctor',
        impactMetrics: [
          'Evaluated 600+ complex M&A merger agreements for LLM benchmark training.',
          'Trained AI-judge models on Delaware Chancery and NY Court of Appeals jurisdictional boundaries.',
        ],
      },
      {
        period: '2016 — 2022',
        company: 'Latham & Watkins LLP',
        title: 'Senior M&A Associate',
        impactMetrics: [
          'Represented private equity sponsors in $14B+ aggregate deal value transactions.',
          'Drafted and negotiated 80+ definitive acquisition agreements and indemnity escrows.',
        ],
      },
      {
        period: '2012 — 2016',
        company: 'Delaware Court of Chancery',
        title: 'Judicial Clerk',
        impactMetrics: [
          'Drafted bench memoranda on fiduciary duty disputes and shareholder appraisal rights.',
        ],
      },
    ],
  },
  {
    id: 'cand-3',
    name: 'Elena Rostova',
    role: 'Staff Distributed Systems Architect & High-Throughput RLHF Lead',
    location: 'Seattle, WA (Remote)',
    rate: 180,
    yearsExperience: 12,
    matchScore: 96,
    aiVerificationBadge: {
      verified: true,
      tier: 'Tier 1 Fellow',
      date: 'Oct 2026',
    },
    skills: ['Rust', 'Distributed Ray / vLLM', 'High-Throughput IPC', 'Apache Arrow / Parquet', 'C++20', 'GPU Kernel Tuning'],
    summary:
      'Ex-AWS / Stripe Staff Engineer specialized in low-latency token streaming pipelines, air-gapped data ingestion engines, and high-concurrency evaluation harnesses capable of 120k requests/sec.',
    status: 'Interviewed',
    matchRationale: [
      { dimension: 'Systems Architecture', score: 99, detail: 'Zero-copy Arrow IPC pipeline processing 4.2M tokens/sec with sub-millisecond serialization latency.' },
      { dimension: 'Concurrency & Invariants', score: 97, detail: 'Demonstrated lock-free ring buffer design with formal state-machine invariant validation.' },
      { dimension: 'Deterministic Verification', score: 95, detail: 'Authored GPU-accelerated validation harnesses for step-level mathematical checks.' },
      { dimension: 'Cleanliness & Speed', score: 94, detail: 'Strict idiomatic memory safety and zero unsafe code violations.' },
    ],
    radarScores: {
      architecture: 99,
      speed: 97,
      communication: 91,
      debugging: 98,
      invariants: 96,
      systemDesign: 98,
    },
    interviewSnippets: [
      {
        timestamp: '08:12',
        chapter: 'Zero-Copy Token Ingestion Pipeline',
        question: 'How do you eliminate memory thrashing when streaming gigabyte-scale parquet trajectories to distributed workers?',
        responseExcerpt: 'We map memory directly using Apache Arrow IPC memory-mapped buffers. Workers read record batches directly from shared memory without Python object deserialization, bypassing the GIL completely.',
        aiInsight: 'Architectural plan minimizes kernel context switches and reduces CPU cache misses by 72%.',
        duration: '2m 30s',
      },
    ],
    timeline: [
      {
        period: '2021 — 2025',
        company: 'Stripe Infrastructure',
        title: 'Staff Systems Engineer',
        impactMetrics: [
          'Scaled core event bus to 180k transactions/sec with 99.999% availability.',
          'Reduced cross-datacenter replication latency by 45ms using custom binary protocols.',
        ],
      },
      {
        period: '2016 — 2021',
        company: 'Amazon Web Services (AWS)',
        title: 'Senior Software Engineer (S3 / DynamoDB)',
        impactMetrics: [
          'Engineered distributed metadata storage layer handling petabyte-scale indices.',
        ],
      },
    ],
  },
  {
    id: 'cand-4',
    name: 'David Chen, CPA, CFA',
    role: 'Corporate Valuation & ASC 740 Tax Fellow',
    location: 'Chicago, IL (Remote)',
    rate: 155,
    yearsExperience: 9,
    matchScore: 92,
    aiVerificationBadge: {
      verified: true,
      tier: 'Staff Calibrated',
      date: 'Aug 2026',
    },
    skills: ['ASC 740 Income Tax', 'NOL Valuation Allowances', 'Discounted Cash Flow (DCF)', 'Option Pricing Models (409A)', 'Financial Modeling'],
    summary:
      'Big-4 National Tax Office alumna with dual CPA and CFA credentials. Specializes in deferred tax asset impairments, transfer pricing benchmarks, and capital structure valuation.',
    status: 'Sourced',
    matchRationale: [
      { dimension: 'ASC 740 Valuation Analysis', score: 94, detail: 'Objective historical 3-year loss evaluation vs subjective pipeline projections.' },
      { dimension: 'Financial Modeling Invariants', score: 93, detail: 'Deterministic discount factor compounding without shortcut approximations.' },
      { dimension: 'Cross-Border Tax Logic', score: 90, detail: 'Clear identification of foreign tax credit limitation categories.' },
      { dimension: 'Documentation Rigor', score: 91, detail: 'Audit-ready workpapers adhering to AICPA standards.' },
    ],
    radarScores: {
      architecture: 91,
      speed: 88,
      communication: 95,
      debugging: 92,
      invariants: 96,
      systemDesign: 89,
    },
    interviewSnippets: [
      {
        timestamp: '04:15',
        chapter: 'Overcoming 3-Year Cumulative Loss Positions',
        question: 'Can uncommitted commercial projections overcome negative historical evidence under ASC 740-10-30-21?',
        responseExcerpt: 'No. ASC 740 expressly states that subjective forecasts of future profitability cannot outweigh objective historical cumulative loss evidence. A valuation allowance is mandatory unless sufficient reversing DTLs exist.',
        aiInsight: 'Immediate adherence to objective evidence hierarchy.',
        duration: '1m 50s',
      },
    ],
    timeline: [
      {
        period: '2020 — Present',
        company: 'Deloitte Tax LLP',
        title: 'Senior Manager, National Tax Accounting',
        impactMetrics: [
          'Advised on ASC 740 tax provisions for 18 multi-national corporate reorganizations.',
          'Constructed algorithmic validation models for deferred tax inventory schedules.',
        ],
      },
    ],
  },
];

export const MOCK_ASSESSMENT: AssessmentScenario = {
  id: 'asc606-allocation-engine',
  title: 'Deterministic Relative Standalone Selling Price Allocation Engine',
  difficulty: 'Staff Specialist',
  timeLimitMinutes: 45,
  description:
    'Under FASB ASC 606-10-32-29, an entity must allocate the total transaction price to each performance obligation on a relative standalone selling price (SSP) basis at contract inception. In addition, you must enforce the variable consideration constraint (ASC 606-10-32-11).\n\nYour task is to implement the allocate_contract_consideration function:\n1. If an SLA uptime rebate exists, evaluate probability. If probability >= 95%, include full consideration; otherwise apply conservative constraint.\n2. Calculate the exact relative allocation for each obligation without floating-point drift.\n3. Return the allocated schedule and verify that the sum of allocated obligations equals total transaction price exactly to 2 decimal places.',
  invariants: [
    'Sum of allocated amounts MUST equal total_consideration within 0.001 tolerance.',
    'No negative revenue allocations permitted.',
    'Relative proportions must strictly match standalone selling price ratios (SSP_i / Sum(SSP)).',
  ],
  starterCode: `// FASB ASC 606-10-32-29 Relative Standalone Selling Price Allocation
// Ensure deterministic invariant: Sum(allocated) === totalConsideration

interface ContractObligation {
  id: string;
  name: string;
  standalonePrice: number;
  deliveryType: 'over_time' | 'point_in_time';
}

interface ContractInput {
  totalPaidUpfront: number;
  variableRebate: number;
  historicalSuccessProbability: number;
  obligations: ContractObligation[];
}

interface AllocationResult {
  transactionPrice: number;
  allocations: {
    obligationId: string;
    allocatedAmount: number;
    ratioPercentage: number;
  }[];
  invariantVerified: boolean;
}

export function allocateContractConsideration(input: ContractInput): AllocationResult {
  // Step 1: Evaluate variable consideration constraint (ASC 606-10-32-11)
  const isConstrained = input.historicalSuccessProbability < 0.95;
  const transactionPrice = isConstrained 
    ? input.totalPaidUpfront - input.variableRebate 
    : input.totalPaidUpfront;

  // Step 2: Sum Standalone Selling Prices
  const totalSSP = input.obligations.reduce((acc, o) => acc + o.standalonePrice, 0);
  if (totalSSP <= 0) throw new Error("Total SSP must be positive");

  // Step 3: Compute Relative Allocations with round-off balance preservation
  let allocatedSum = 0;
  const allocations = input.obligations.map((obligation, index) => {
    const ratio = obligation.standalonePrice / totalSSP;
    
    // For the final item, absorb rounding residual to preserve identity
    let amount: number;
    if (index === input.obligations.length - 1) {
      amount = Math.round((transactionPrice - allocatedSum) * 100) / 100;
    } else {
      amount = Math.round((transactionPrice * ratio) * 100) / 100;
      allocatedSum += amount;
    }

    return {
      obligationId: obligation.id,
      allocatedAmount: amount,
      ratioPercentage: Math.round(ratio * 10000) / 100,
    };
  });

  const sumCheck = allocations.reduce((acc, a) => acc + a.allocatedAmount, 0);
  const invariantVerified = Math.abs(sumCheck - transactionPrice) < 0.01;

  return {
    transactionPrice,
    allocations,
    invariantVerified,
  };
}`,
  testCases: [
    {
      id: 'tc-1',
      name: 'Standard Cloud SaaS + Implementation with 98% SLA',
      input: '{ totalPaidUpfront: 420000, variableRebate: 50000, prob: 0.98, ssp: [350000, 70000] }',
      expectedOutput: 'TransactionPrice: $420,000 | SaaS: $350,000.00 | API: $70,000.00 | Invariant: PASSED',
      actualOutput: 'TransactionPrice: $420,000 | SaaS: $350,000.00 | API: $70,000.00 | Invariant: PASSED',
      passed: true,
    },
    {
      id: 'tc-2',
      name: 'Constrained Contract (Historical Uptime 88% < 95%)',
      input: '{ totalPaidUpfront: 420000, variableRebate: 50000, prob: 0.88, ssp: [350000, 70000] }',
      expectedOutput: 'TransactionPrice: $370,000 | SaaS: $308,333.33 | API: $61,666.67 | Invariant: PASSED',
      actualOutput: 'TransactionPrice: $370,000 | SaaS: $308,333.33 | API: $61,666.67 | Invariant: PASSED',
      passed: true,
    },
    {
      id: 'tc-3',
      name: 'Triple-Bundle Non-Terminating Decimal Rounding Invariant Check',
      input: '{ totalPaidUpfront: 100000, variableRebate: 0, prob: 1.0, ssp: [33333.33, 33333.33, 33333.34] }',
      expectedOutput: 'Sum === 100000.00 exact (Residual absorbed into final tranche)',
      actualOutput: 'Sum === 100000.00 exact (Residual absorbed into final tranche)',
      passed: true,
    },
  ],
};
