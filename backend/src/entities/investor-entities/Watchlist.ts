// entities/Watchlist.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";
import { Stock } from "./Stock"; // Changed from PortfolioStock

@Entity()
export class Watchlist {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @ManyToOne(() => User, (user) => user.watchlists)
    user!: User;

    @ManyToMany(() => Stock) // Fixed to Stock
    @JoinTable()
    stocks!: Stock[];
}