import { Investment } from "../contexts/MarketContext";

export enum InvestmentGoal {
  LONG_TERM_GROWTH = "long_term_growth",
  INCOME = "income",
  CAPITAL_PRESERVATION = "capital_preservation",
  SPECULATION = "speculation",
}

export enum RiskTolerance {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum ExperienceLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  EXPERIENCED = "experienced",
}

// This mirrors your backend entity exactly
export interface Investor {
  id: string;
  user_id: string;
  profile_id: string;

  investment_goal: InvestmentGoal;
  risk_tolerance: RiskTolerance;
  experience_level: ExperienceLevel;
  annual_investment_budget: number;
  auto_invest_enabled: boolean;
  investments: Investment[];

  created_at: string;
  updated_at: string;
}
