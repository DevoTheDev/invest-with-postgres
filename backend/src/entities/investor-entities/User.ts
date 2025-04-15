// entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Portfolio } from "./Portfolio";
import { Transaction } from "./Transaction";
import { Watchlist } from "./Watchlist";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ nullable: true })
    firstName!: string;

    @Column({ nullable: true })
    lastName!: string;

    @Column({ type: "decimal", precision: 15, scale: 2, default: 0.00 })
    accountBalance!: number;

    @Column({ default: true })
    isActive!: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;

    // Relationships
    @OneToMany(() => Portfolio, (portfolio) => portfolio.user)
    portfolios!: Portfolio[];

    @OneToMany(() => Transaction, (transaction) => transaction.user)
    transactions!: Transaction[];

    @OneToMany(() => Watchlist, (watchlist) => watchlist.user)
    watchlists!: Watchlist[];
}
