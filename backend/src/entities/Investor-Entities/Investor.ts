import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

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


// Investment representation
export type Investment = {
  id: string,
  ticker: string;        
  quantity: number;      
  purchase_price: number;
  purchase_date: Date;   
};

@Entity("investors")
@Index("idx_investors_user_id", ["user_id"])
export class Investor {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("uuid")
  user_id!: string;

  @Column({
    type: "enum",
    enum: InvestmentGoal,
    default: InvestmentGoal.LONG_TERM_GROWTH,
  })
  investment_goal!: InvestmentGoal;

  @Column({
    type: "enum",
    enum: RiskTolerance,
    default: RiskTolerance.MEDIUM,
  })
  risk_tolerance!: RiskTolerance;

  @Column({
    type: "enum",
    enum: ExperienceLevel,
    default: ExperienceLevel.BEGINNER,
  })
  experience_level!: ExperienceLevel;

  @Column("integer", { default: 0 })
  annual_investment_budget!: number;

  @Column("boolean", { default: false })
  auto_invest_enabled!: boolean;

  // 🔥 NEW: Watchlist of stock tickers
  @Column("text", { array: true, default: [] })
  watchlist!: string[];

  // 🔥 NEW: List of investments (as JSONB)
  @Column("jsonb", { default: () => "'[]'" })
  investments!: Investment[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

