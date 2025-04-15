// entities/Stock.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Stock {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    symbol!: string;

    @Column()
    companyName!: string;

    @Column({ type: "decimal", precision: 15, scale: 2, nullable: true })
    currentPrice!: number;

    @Column({ type: "timestamp", nullable: true })
    lastUpdated!: Date;
}