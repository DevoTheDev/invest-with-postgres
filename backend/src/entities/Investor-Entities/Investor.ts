import { Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Watchlist } from './Watchlist';
import { Investment } from './Investment';

@Entity('investors')
export class Investor {
  @PrimaryColumn({ name: 'user_id', type: 'integer' })
  user_id!: number;

  @OneToMany(() => Watchlist, (watchlist) => watchlist.investor)
  watchlists!: Watchlist[];

  @OneToMany(() => Investment, (investment) => investment.investor)
  investments!: Investment[];
}