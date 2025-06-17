import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Index,
} from "typeorm";

// Enum for training emphasis
export enum TrainingEmphasis {
  MUSCLE_SIZE = "muscle_size",
  MUSCLE_STRENGTH = "muscle_strength",
  MUSCLE_ENDURANCE = "muscle_endurance",
  MUSCLE_SHAPE = "muscle_shape",
}

// Movement base
export class Movement {
  title!: string;
  description!: string;
}

// Exercise extends Movement
export class Exercise extends Movement {
  reps!: number;
  sets!: number;
}

// Workout type for storage
export type Workout = {
  id: string;
  title: string;
  workouts: Exercise[];
};

@Entity("exercisers")
@Index("idx_exercisers_user_id", ["user_id"])
export class Exerciser {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("uuid")
  user_id!: string;

  @Column({
    type: "enum",
    enum: TrainingEmphasis,
    default: TrainingEmphasis.MUSCLE_SIZE,
  })
  training_emphasis?: TrainingEmphasis;

  // Store array of workouts as JSONB
  @Column("jsonb", { default: () => "'[]'" })
  programs?: Workout[];

  @Column("float")
  height_cm?: number;

  @Column("float")
  weight_kg?: number;

  @Column("float")
  body_fat_percentage?: number;

  @Column("float")
  weekly_workout_frequency?: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
