export type Investor = {
    id: string;
    user_id: string;
    profile_id: string;
    investment_goal: string;
    risk_tolerance: string;
    experience_level: string;
    preferred_asset_classes: string[];
    annual_investment_budget: number;
    auto_invest_enabled: boolean;
    created_at: string;
    updated_at: string;
  };