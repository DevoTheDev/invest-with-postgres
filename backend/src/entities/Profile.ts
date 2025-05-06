import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { UserProfile, ThemePreference, LanguageOption } from '../types/shared/shared-types';

@Entity('profiles')
export class Profile implements UserProfile {
  @PrimaryColumn({ name: 'id', type: 'varchar' })
  id: string = '';

  @Column({ type: 'varchar', length: 100 })
  name: string = '';

  @Column({ type: 'varchar', length: 255 })
  email: string = '';

  @Column({ type: 'varchar', length: 50, unique: true })
  username: string = '';

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatarUrl?: string;

  @Column({ type: 'varchar', length: 20, default: ThemePreference.System })
  themePreference: ThemePreference = ThemePreference.System;

  @Column({ type: 'varchar', length: 10, default: LanguageOption.En })
  language: LanguageOption = LanguageOption.En;

  @Column({ type: 'jsonb', default: () => "'{\"email\": true, \"push\": true}'" })
  notifications: { email: boolean; push: boolean } = { email: true, push: true };

  @Column({ type: 'jsonb', default: () => "'{\"backgroundSync\": false, \"activityLogs\": false}'" })
  dataUsage: { backgroundSync: boolean; activityLogs: boolean } = {
    backgroundSync: false,
    activityLogs: false,
  };

  @Column({ type: 'boolean', default: false })
  isEmailVerified: boolean = false;

  @Column({ type: 'boolean', default: true })
  isActive: boolean = true;

  @Column({ type: 'varchar', default: () => "'1970-01-01T00:00:00.000Z'" })
  created_at: string = new Date().toISOString();

  @Column({ type: 'varchar', default: () => "'1970-01-01T00:00:00.000Z'", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: string = new Date().toISOString();

  @OneToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id', referencedColumnName: '_id' })
  user!: User;
}