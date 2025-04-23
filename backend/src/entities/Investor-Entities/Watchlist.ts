import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Investor } from './Investor';
import { WatchlistTicker } from './WatchlistTicker';

@Entity('watchlists')
export class Watchlist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  title!: string;

  @ManyToOne(() => Investor, (investor) => investor.watchlists)
  investor!: Investor;

  @Column({ name: 'investor_id', type: 'integer' })
  investor_id!: number;

  @OneToMany(() => WatchlistTicker, (watchlistTicker) => watchlistTicker.watchlist)
  tickers!: WatchlistTicker[];
}