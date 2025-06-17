import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { UserProfile, ThemePreference, LanguageOption } from "../types/shared/shared-types";

@Entity("profiles")
export class Profile implements UserProfile {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 100 })
  name: string = "";

  @Column({ type: "varchar", length: 255 })
  email: string = "";

  @Column({ type: "varchar", length: 50, unique: true, nullable: true })
  username?: string = "";

  @Column({ type: "varchar", length: 20, nullable: true })
  phone?: string;  // Matches optional in interface

  @Column({ type: "text", nullable: true })
  bio?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  avatarUrl?: string;

  @Column({ type: "varchar", length: 20, default: ThemePreference.System })
  themePreference: ThemePreference = ThemePreference.System;

  @Column({ type: "varchar", length: 10, default: LanguageOption.En })
  language: LanguageOption = LanguageOption.En;

  @Column({ type: "jsonb", default: () => "'{\"email\": true, \"push\": true}'" })
  notifications: { email: boolean; push: boolean } = { email: true, push: true };

  @Column({ type: "jsonb", default: () => "'{\"backgroundSync\": false, \"activityLogs\": false}'" })
  dataUsage: { backgroundSync: boolean; activityLogs: boolean } = { backgroundSync: false, activityLogs: false };

  @Column({ type: "boolean", default: false })
  isEmailVerified: boolean = false;

  @Column({ type: "boolean", default: true })
  isActive: boolean = true;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @Column("uuid")
  user_id!: string;
}
