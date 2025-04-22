import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity('profiles')
export class Profile {
  @PrimaryColumn({ name: 'user_id', type: 'integer' })
  user_id: number = 0;

  @Column({ type: 'varchar', length: 50, nullable: true })
  firstName: string | null = null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lastName: string | null = null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phoneNumber: string | null = null;

  @Column({ type: 'date', nullable: true })
  birthday: string | null = null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date = new Date();

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date = new Date();

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: '_id' })
  user!: User;
}