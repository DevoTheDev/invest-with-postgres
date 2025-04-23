// backend/src/entities/database-entities/Secret.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('secrets')
export class Secret {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50 })
  key_name!: string;

  @Column({ type: 'varchar', length: 255 })
  key_value!: string;
}
