export interface Ticker {
  ticker: string;
  name: string;
  market: string;
  locale: string;
  primary_exchange: string;
  type: string;
  active: boolean;
  currency_name: string;
  cik: string;
  composite_figi: string;
  share_class_figi: string;
  last_updated_utc: string;
}

export type Company = Ticker & {
  name: string;
  marketCap?: number;
  sector?: string;
};
export type Stock = Company & {
  sharePrice: number;
  shareCount: number;
  movement: {
    intraday: number | string | any; // Allow intraday to store API response object
    daily: number | string;
    weekly: number | string;
    monthly: number | string;
    quarterly: number | string;
  };
};
export type Investment = Stock & {
  sharesOwned: number;
};

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
