import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Index,
} from "typeorm";
import { User } from "../User";
import { Profile } from "../Profile";

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

export enum AssetClass {
  STOCKS = "stocks",
  BONDS = "bonds",
  ETFS = "etfs",
  REAL_ESTATE = "real_estate",
  CRYPTO = "crypto",
}

@Entity("investors")
@Index("idx_investors_user_id", ["user_id"])
@Index("idx_investors_profile_id", ["profile_id"])
export class Investor {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("uuid")
  user_id!: string;

  @Column("uuid")
  profile_id!: string;

  @ManyToOne(() => User, (user) => user.investors, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => Profile, (profile) => profile.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "profile_id" })
  profile!: Profile;

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

  @Column("enum", { enum: AssetClass, array: true, default: [] })
  preferred_asset_classes!: AssetClass[];

  @Column("integer", { default: 0 })
  annual_investment_budget!: number;

  @Column("boolean", { default: false })
  auto_invest_enabled!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
