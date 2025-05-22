import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Index,
} from "typeorm";
import { User } from "../User";
import { Profile } from "../Profile";

export enum FitnessGoal {
  LOSE_WEIGHT = "lose_weight",
  GAIN_MUSCLE = "gain_muscle",
  MAINTAIN_WEIGHT = "maintain_weight",
  IMPROVE_ENDURANCE = "improve_endurance",
  GENERAL_FITNESS = "general_fitness",
}

export enum ActivityLevel {
  SEDENTARY = "sedentary",
  LIGHTLY_ACTIVE = "lightly_active",
  MODERATELY_ACTIVE = "moderately_active",
  VERY_ACTIVE = "very_active",
  SUPER_ACTIVE = "super_active",
}

@Entity("exercisers")
@Index("idx_exercisers_user_id", ["user_id"])
@Index("idx_exercisers_profile_id", ["profile_id"])
export class Exerciser {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("uuid")
  user_id!: string;

  @Column("uuid")
  profile_id!: string;

  @Column({
    type: "enum",
    enum: FitnessGoal,
    default: FitnessGoal.GENERAL_FITNESS,
  })
  fitness_goal!: FitnessGoal;

  @Column({
    type: "enum",
    enum: ActivityLevel,
    default: ActivityLevel.SEDENTARY,
  })
  activity_level!: ActivityLevel;

  @Column("jsonb", { default: () => "'[]'" })
  preferred_exercise_types!: string[];

  @Column("float", { nullable: true })
  height_cm?: number;

  @Column("float", { nullable: true })
  weight_kg?: number;

  @Column("float", { nullable: true })
  body_fat_percentage?: number;

  @Column("int", { nullable: true })
  weekly_workout_frequency?: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne(() => User, (user) => user.exercisers, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => Profile, (profile) => profile.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "profile_id" })
  profile!: Profile;
}

