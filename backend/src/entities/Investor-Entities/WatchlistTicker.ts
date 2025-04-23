import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Watchlist } from './Watchlist';

@Entity('watchlist_tickers')
export class WatchlistTicker {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 10 })
  ticker!: string;

  @ManyToOne(() => Watchlist, (watchlist) => watchlist.tickers)
  watchlist!: Watchlist;

  @Column({ name: 'watchlist_id', type: 'integer' })
  watchlist_id!: number;
}