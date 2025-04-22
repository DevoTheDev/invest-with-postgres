// src/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  _id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;
}
