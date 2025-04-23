import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Exerciser } from './Exerciser';

@Entity('workouts')
export class Workout {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'timestamp' })
  date!: Date;

  @Column({ type: 'text' })
  exercises!: string; // Placeholder: JSON or separate table later

  @ManyToOne(() => Exerciser, (exerciser) => exerciser.workouts)
  exerciser!: Exerciser;

  @Column({ name: 'exerciser_id', type: 'integer' })
  exerciser_id!: number;
}