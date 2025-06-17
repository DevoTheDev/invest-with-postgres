import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import { Profile } from "./Profile";
import { Exerciser } from "./Exerciser-Entities/Exerciser";
import { Investor } from "./Investor-Entities/Investor";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column({ type: "varchar" })
  password!: string;

  @OneToOne(() => Profile, (profile) => profile.user_id, { cascade: true })
  profile!: Profile;

  @OneToOne(() => Exerciser, (exerciser) => exerciser.user_id, { cascade: true })
  exercisers!: Exerciser[];

  @OneToOne(() => Investor, (investor) => investor.user_id, { cascade: true })
  investors!: Investor[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}