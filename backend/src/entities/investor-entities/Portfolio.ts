// entities/Portfolio.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { PortfolioStock } from "./PortfolioStock";

@Entity()
export class Portfolio {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @ManyToOne(() => User, (user) => user.portfolios)
    user!: User;

    @OneToMany(() => PortfolioStock, (portfolioStock) => portfolioStock.portfolio)
    portfolioStocks!: PortfolioStock[];
}