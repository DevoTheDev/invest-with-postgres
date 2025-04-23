import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity('profiles')
export class Profile {
  @PrimaryColumn({ name: 'user_id', type: 'varchar' })
  user_id?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  firstName?: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lastName?: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phoneNumber?: string | null;

  @Column({ type: 'date', nullable: true })
  birthday?: Date | string| null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at?: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: '_id' })
  user?: User;
}