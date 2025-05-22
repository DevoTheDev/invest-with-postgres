import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { Profile } from "./Profile";
import { Exerciser } from "./Exerciser-Entities/Exerciser";
import { Investor } from "./Investor-Entities/Investor";

@Entity("users") // plural for consistency
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column({ type: "varchar" })
  password!: string;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  profile!: Profile;

  @OneToMany(() => Exerciser, (exerciser) => exerciser.user)
  exercisers!: Exerciser[];

  @OneToMany(() => Investor, (investor) => investor.user)
  investors!: Investor[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
