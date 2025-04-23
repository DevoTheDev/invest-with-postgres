import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Investor } from './Investor';

@Entity('investments')
export class Investment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 10 })
  ticker!: string;

  @Column({ type: 'integer' })
  shares!: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  purchasePrice!: number;

  @Column({ type: 'timestamp' })
  lastInvestmentAdjustment!: Date;

  @ManyToOne(() => Investor, (investor) => investor.investments)
  investor!: Investor;

  @Column({ name: 'investor_id', type: 'integer' })
  investor_id!: number;
}