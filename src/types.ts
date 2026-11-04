/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppViewMode = 'sourcing' | 'scorecard' | 'assessment' | 'pipeline';

export type ScreenerTrack = 'accounting' | 'legal' | 'tax';

export interface EvaluationResult {
  score: number;
  pass: boolean;
  grade: 'Tier-1 Fellow' | 'Calibrated Pass' | 'Uncalibrated / Reject';
  reasoningTrajectory: string;
  citationVerification: string;
  invariantCheck: string;
  hallucinationRate: string;
  feedback: string;
  rubricBreakdown: {
    statutoryFidelity: number;
    arithmeticIntegrity: number;
    chainCompleteness: number;
    contractualBoundary: number;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  evaluation?: EvaluationResult;
}

export interface ScenarioData {
  id: ScreenerTrack;
  title: string;
  badge: string;
  citation: string;
  difficulty: string;
  problemStatement: string;
  excerpts: { title: string; text: string }[];
  initialQuestion: string;
  passingAnswer: string;
  flawedAnswer: string;
  requiredInvariants: string[];
}

export interface TraceComparison {
  id: string;
  domain: string;
  title: string;
  inputPrompt: string;
  uncalibratedOutput: {
    author: string;
    score: number;
    flaw: string;
    steps: string[];
  };
  nuvonixOutput: {
    author: string;
    pedigree: string;
    score: number;
    invariants: string;
    steps: {
      stepNum: string;
      title: string;
      citation: string;
      content: string;
    }[];
  };
}

export interface Candidate {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  location: string;
  rate: number; // Hourly USD, strictly right-aligned
  yearsExperience: number; // strictly right-aligned
  matchScore: number; // 0-100, strictly right-aligned
  aiVerificationBadge: {
    verified: boolean;
    tier: 'Tier 1 Fellow' | 'Top 1% Senior' | 'Staff Calibrated';
    date: string;
  };
  skills: string[];
  matchRationale: {
    dimension: string;
    score: number; // 0-100
    detail: string;
  }[];
  radarScores: {
    architecture: number;
    speed: number;
    communication: number;
    debugging: number;
    invariants: number;
    systemDesign: number;
  };
  summary: string;
  status: 'Vetted' | 'Interviewed' | 'Sourced' | 'Offered';
  interviewSnippets: {
    timestamp: string;
    chapter: string;
    question: string;
    responseExcerpt: string;
    aiInsight: string;
    duration: string;
  }[];
  timeline: {
    period: string;
    company: string;
    title: string;
    impactMetrics: string[];
  }[];
}

export interface AssessmentTestCase {
  id: string;
  name: string;
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  passed?: boolean;
}

export interface AssessmentScenario {
  id: string;
  title: string;
  difficulty: 'Hard' | 'Staff Specialist' | 'Senior';
  timeLimitMinutes: number;
  description: string;
  invariants: string[];
  starterCode: string;
  testCases: AssessmentTestCase[];
}
