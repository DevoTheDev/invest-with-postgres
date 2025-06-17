import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from "typeorm";

@Entity('movements')
export class Movement {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;
}
