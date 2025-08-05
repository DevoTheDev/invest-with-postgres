"use client";
import React, { createContext, useState, useEffect, useCallback, useContext, JSX } from "react";
import { useAuth } from "../hooks/useAuth";
import { getProfile, updateProfile as updateProfileApi } from "../controllers/ProfileController";
import { useForm } from "react-hook-form";
import { skip } from "node:test";
import { formatHeader } from "../utils/stringUtils";
import { SaveIcon } from "lucide-react";
import CustomSubmit from "../components/molecules/CustomSubmit";

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
  username?: string;
  phone?: string;
  bio?: string;
  avatarUrl?: string;
  themePreference?: ThemePreference;
  language?: LanguageOption;
  notifications?: { email: boolean; push: boolean };
  dataUsage?: { backgroundSync: boolean; activityLogs: boolean };
  isEmailVerified?: boolean;
  isActive?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

type ProfileContextType = {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  form: (isOpen: boolean) => JSX.Element;
};

export const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  loading: true,
  error: null,
  fetchProfile: async () => { },
  updateProfile: async () => { },
  form: (isOpen: boolean) => <></>,
});

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<UserProfile>({
    defaultValues: profile || {}
  });

  const fetchProfile = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getProfile();
      setProfile(response.data.data.profile);
    } catch (err) {
      setError((err as Error).message);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const updateProfile = useCallback(async (data: Partial<UserProfile>) => {
    setLoading(true);
    setError(null);
    const filteredDto: Partial<UserProfile> = {};
    ([
      "name",
      "email",
      "username",
      "bio",
      "avatarUrl",
      "phone",
      "themePreference",
      "language",
      "notifications",
      "dataUsage",
    ] as (keyof UserProfile)[]).forEach((key) => {
      if (data[key] !== undefined) filteredDto[key] = data[key];
    });
    try {
      const response = await updateProfileApi(filteredDto);
      setProfile(response.data.data.updatedProfile);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) fetchProfile();
    else {
      setProfile(null);
      setLoading(false);
    }
  }, [user, fetchProfile]);

  useEffect(() => {
    if (profile) reset(profile);
  }, [profile, reset]);


  // ADD form() FUNCTION
  const form = (isOpen: boolean,) => {
    const onSubmit = async (data: UserProfile) => {
      await updateProfile(data);
    };

    if (loading) return <p className="text-center text-gray-600">Loading profile...</p>;
    if (error) return <p className="text-red-600 font-medium">Error: {error}</p>;

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col max-w-3xl gap-8 bg-white p-8 rounded-xl shadow-lg  mx-auto">
        {/* Personal Info Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                id="name"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your full name"
                className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                id="email"
                {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" } })}
                placeholder="Enter your email"
                className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                id="username"
                {...register("username")}
                placeholder="Enter your username"
                className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                id="phone"
                {...register("phone")}
                placeholder="Enter your phone number"
                className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
              <input
                id="avatarUrl"
                {...register("avatarUrl")}
                placeholder="Enter avatar URL"
                className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              id="bio"
              {...register("bio")}
              placeholder="Tell us about yourself"
              className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors min-h-[100px]"
            />
          </div>
        </div>

        {/* Preferences Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="themePreference" className="block text-sm font-medium text-gray-700 mb-1">Theme Preference</label>
              <select
                id="themePreference"
                {...register("themePreference")}
                className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="">Select Theme</option>
                {Object.values(ThemePreference).map(theme => (
                  <option key={theme} value={theme}>{theme}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select
                id="language"
                {...register("language")}
                className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="">Select Language</option>
                {Object.values(LanguageOption).map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Notifications & Data Usage */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Settings</h2>
          <fieldset className="border border-gray-200 rounded-lg p-5">
            <legend className="text-sm font-semibold text-gray-800 px-2">Notifications</legend>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  {...register("notifications.email")}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Email Notifications</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  {...register("notifications.push")}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Push Notifications</span>
              </label>
            </div>
          </fieldset>

          {/* Background Sync & Activity Logs */}
          <fieldset className="border border-gray-200 rounded-lg p-5">
            <legend className="text-sm font-semibold text-gray-800 px-2">Data Usage</legend>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  {...register("dataUsage.backgroundSync")}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Background Sync</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  {...register("dataUsage.activityLogs")}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Activity Logs</span>
              </label>
            </div>
          </fieldset>
        </div>

        {/* Intentionally excluding isEmailVerified and isActive from client updates */}

        {/* Profile Dates */}
        <div className="text-sm text-gray-500 space-y-1 flex justify-end">
        <CustomSubmit
        loading={loading}
        icon={<SaveIcon />}
        notClicked={{
          title: "Save Changes",
          style: `
          bg-blue-500 flex justify-between items-center 
          gap-3 rounded-md font-bold text-md text-white 
          px-4 py-2
          `
        }}
        clicked={{
          title: "Saving...",
          style: `
          bg-blue-300 flex justify-between items-center 
          gap-3 rounded-md font-bold text-md text-white 
          px-4 py-2
          `
        }}
        />
        </div>

      </form>
    );
  };


  return (
    <ProfileContext.Provider value={{ profile, loading, error, fetchProfile, updateProfile, form }}>
      {children}
    </ProfileContext.Provider>
  );
};
