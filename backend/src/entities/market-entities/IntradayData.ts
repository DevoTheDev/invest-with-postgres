// src/entities/IntradayData.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class IntradayData {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  symbol!: string;

  @Column()
  interval!: string;

  @Column()
  timestamp!: Date;

  @Column('float')
  open!: number;

  @Column('float')
  high!: number;

  @Column('float')
  low!: number;

  @Column('float')
  close!: number;

  @Column('bigint')
  volume!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
