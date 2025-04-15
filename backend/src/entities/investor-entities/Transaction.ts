// entities/Transaction.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    stockSymbol!: string;

    @Column({ type: "decimal", precision: 15, scale: 2 })
    quantity!: number;

    @Column({ type: "decimal", precision: 15, scale: 2 })
    pricePerShare!: number;

    @Column({ type: "enum", enum: ["BUY", "SELL"] })
    type!: "BUY" | "SELL";

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    transactionDate!: Date;

    @ManyToOne(() => User, (user) => user.transactions)
    user!: User;
}