// backend/src/entities/database-entities/Secret.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "secrets" })
export class Secret {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({nullable: true})
  key_name!: string;

  @Column()
  key_value!: string;
}

