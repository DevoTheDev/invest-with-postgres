import { Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Workout } from './Workout'; // Placeholder for future entity

@Entity('exercisers')
export class Exerciser {
  @PrimaryColumn({ name: 'user_id', type: 'integer' })
  user_id!: number;

  @OneToMany(() => Workout, (workout) => workout.exerciser)
  workouts!: Workout[];
}