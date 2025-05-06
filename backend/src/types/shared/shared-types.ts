export enum ThemePreference {
  System = 'system',
  Dark = 'dark',
  Light = 'light',
}

export enum LanguageOption {
  En = 'en',
  Es = 'es',
  Fr = 'fr',
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  username: string;
  bio?: string;
  avatarUrl?: string;
  themePreference: ThemePreference;
  language: LanguageOption;
  notifications: {
    email: boolean;
    push: boolean;
  };
  dataUsage: {
    backgroundSync: boolean;
    activityLogs: boolean;
  };
  isEmailVerified: boolean;
  isActive: boolean;
  created_at: string;
  updated_at: string;
}