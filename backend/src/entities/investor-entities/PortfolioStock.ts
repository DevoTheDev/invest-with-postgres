// entities/PortfolioStock.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Portfolio } from "./Portfolio";

@Entity()
export class PortfolioStock {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    stockSymbol!: string;

    @Column({ type: "decimal", precision: 15, scale: 2 })
    quantity!: number;

    @Column({ type: "decimal", precision: 15, scale: 2 })
    purchasePrice!: number;

    @Column({ type: "timestamp" })
    purchaseDate!: Date;

    @ManyToOne(() => Portfolio, (portfolio) => portfolio.portfolioStocks)
    portfolio!: Portfolio;
}