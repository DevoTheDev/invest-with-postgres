"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProfile } from "@/app/hooks/useProfile";
import { useExerciser } from "@/app/hooks/useExerciser";
import { useInvestor } from "@/app/hooks/useInvestor";
import { UserProfile, ThemePreference, LanguageOption } from "@/app/types/UserProfile";
import { Exerciser } from "@/app/types/Exerciser";
import { Investor } from "@/app/types/Investor";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  username: z.string().min(1, "Username is required"),
  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
  themePreference: z.enum([ThemePreference.System, ThemePreference.Dark, ThemePreference.Light]).optional(),
  language: z.enum([LanguageOption.En, LanguageOption.Es, LanguageOption.Fr]).optional(),
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
  }).optional(),
  dataUsage: z.object({
    backgroundSync: z.boolean(),
    activityLogs: z.boolean(),
  }).optional(),
});

const exerciserSchema = z.object({
  fitness_goal: z.enum([
    "lose_weight",
    "gain_muscle",
    "maintain_weight",
    "improve_endurance",
    "general_fitness",
  ]).optional(),
  activity_level: z.enum([
    "sedentary",
    "lightly_active",
    "moderately_active",
    "very_active",
    "super_active",
  ]).optional(),
  preferred_exercise_types: z.array(z.string()).optional(),
  height_cm: z.number().min(50, "Height must be at least 50 cm").nullable().optional(),
  weight_kg: z.number().min(20, "Weight must be at least 20 kg").nullable().optional(),
  body_fat_percentage: z.number().min(0, "Body fat must be non-negative").max(100).nullable().optional(),
  weekly_workout_frequency: z.number().min(0, "Frequency must be non-negative").nullable().optional(),
});

const investorSchema = z.object({
  investment_goal: z.enum([
    "long_term_growth",
    "income",
    "capital_preservation",
    "speculation",
  ]).optional(),
  risk_tolerance: z.enum(["low", "medium", "high"]).optional(),
  experience_level: z.enum(["beginner", "intermediate", "experienced"]).optional(),
  preferred_asset_classes: z.array(z.enum([
    "stocks",
    "bonds",
    "etfs",
    "real_estate",
    "crypto",
  ])).optional(),
  annual_investment_budget: z.number().min(0, "Budget must be non-negative").optional(),
  auto_invest_enabled: z.boolean().optional(),
});

const formSchema = z.object({
  profile: profileSchema,
  exerciser: exerciserSchema,
  investor: investorSchema,
});

type FormValues = z.infer<typeof formSchema>;

type Section = "profile" | "fitness" | "investment";

const SettingsPage: React.FC = () => {
  const { profile, updateProfile, loading: profileLoading, error: profileError } = useProfile();
  const { exerciser, updateExerciser, loading: exerciserLoading, error: exerciserError } = useExerciser();
  const { investor, updateInvestor, loading: investorLoading, error: investorError } = useInvestor();
  const [activeSection, setActiveSection] = useState<Section>("profile");

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profile: {
        name: "",
        email: "",
        username: "",
        bio: "",
        avatarUrl: "",
        themePreference: ThemePreference.System,
        language: LanguageOption.En,
        notifications: { email: true, push: true },
        dataUsage: { backgroundSync: false, activityLogs: false },
      },
      exerciser: {
        fitness_goal: "general_fitness",
        activity_level: "sedentary",
        preferred_exercise_types: [],
        height_cm: null,
        weight_kg: null,
        body_fat_percentage: null,
        weekly_workout_frequency: null,
      },
      investor: {
        investment_goal: "long_term_growth",
        risk_tolerance: "medium",
        experience_level: "beginner",
        preferred_asset_classes: [],
        annual_investment_budget: 0,
        auto_invest_enabled: false,
      },
    },
  });

  useEffect(() => {
    reset({
      profile: profile ? {
        name: profile.name || "",
        email: profile.email || "",
        username: profile.username || "",
        bio: profile.bio || "",
        avatarUrl: profile.avatarUrl || "",
        themePreference: profile.themePreference || ThemePreference.System,
        language: profile.language || LanguageOption.En,
        notifications: profile.notifications || { email: true, push: true },
        dataUsage: profile.dataUsage || { backgroundSync: false, activityLogs: false },
      } : undefined,
      exerciser: exerciser ? {
        fitness_goal: (exerciser.fitness_goal as "lose_weight" | "gain_muscle" | "maintain_weight" | "improve_endurance" | "general_fitness") || "general_fitness",
        activity_level: (exerciser.activity_level as "sedentary" | "lightly_active" | "moderately_active" | "very_active" | "super_active") || "sedentary",
        preferred_exercise_types: exerciser.preferred_exercise_types || [],
        height_cm: exerciser.height_cm ?? null,
        weight_kg: exerciser.weight_kg ?? null,
        body_fat_percentage: exerciser.body_fat_percentage ?? null,
        weekly_workout_frequency: exerciser.weekly_workout_frequency ?? null,
      } : undefined,
      investor: investor ? {
        investment_goal: (investor.investment_goal as "long_term_growth" | "income" | "capital_preservation" | "speculation") || "long_term_growth",
        risk_tolerance: (investor.risk_tolerance as "low" | "medium" | "high") || "medium",
        experience_level: (investor.experience_level as "beginner" | "intermediate" | "experienced") || "beginner",
        preferred_asset_classes: investor.preferred_asset_classes as ("stocks" | "bonds" | "etfs" | "real_estate" | "crypto")[] || [],
        annual_investment_budget: investor.annual_investment_budget ?? 0,
        auto_invest_enabled: investor.auto_invest_enabled ?? false,
      } : undefined,
    });
  }, [profile, exerciser, investor, reset]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (profile) {
        await updateProfile(data.profile);
      }
      if (exerciser) {
        await updateExerciser(data.exerciser);
      }
      if (investor) {
        await updateInvestor(data.investor);
      }
    } catch (err) {
      console.error("Failed to update settings:", err);
    }
  };

  const loading = profileLoading || exerciserLoading || investorLoading;
  const error = profileError || exerciserError || investorError;

  return (
    <div className="min-h-screen bg-gray-700 flex items-center justify-center px-8 py-16">
      <div className="w-full max-w-7xl bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded-xl shadow-md p-8 space-y-8">
        <h1 className="text-3xl font-extrabold text-white text-center tracking-tight">Settings</h1>
        {error && (
          <div className="bg-red-500/10 text-red-300 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        {loading && (
          <div className="text-center text-gray-100">Loading...</div>
        )}
        {!profile && !loading && (
          <div className="text-center text-gray-100">Please create a profile to access settings.</div>
        )}
        {profile && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Navbar */}
            <nav className="bg-gray-600/50 rounded-lg p-2 flex justify-center gap-4">
              <button
                type="button"
                onClick={() => setActiveSection("profile")}
                className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
                  activeSection === "profile"
                    ? "bg-cyan-300 text-gray-900"
                    : "text-white hover:text-cyan-300"
                }`}
                aria-selected={activeSection === "profile"}
              >
                Profile
              </button>
              <button
                type="button"
                onClick={() => setActiveSection("fitness")}
                className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
                  activeSection === "fitness"
                    ? "bg-cyan-300 text-gray-900"
                    : "text-white hover:text-cyan-300"
                }`}
                aria-selected={activeSection === "fitness"}
              >
                Fitness
              </button>
              <button
                type="button"
                onClick={() => setActiveSection("investment")}
                className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
                  activeSection === "investment"
                    ? "bg-cyan-300 text-gray-900"
                    : "text-white hover:text-cyan-300"
                }`}
                aria-selected={activeSection === "investment"}
              >
                Investment
              </button>
            </nav>

            {/* Profile Section */}
            {activeSection === "profile" && (
              <div className="grid grid-cols-2 gap-6 animate-fade-in">
                <div>
                  <label className="block text-sm font-light text-gray-100">Name</label>
                  <Controller
                    name="profile.name"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="mt-1 w-full p-2 bg-transparent border-b border-gray-300 text-white focus:border-cyan-300 outline-none transition-colors duration-200 placeholder:text-gray-300"
                        placeholder="Enter name"
                      />
                    )}
                  />
                  {errors.profile?.name && (
                    <p className="text-red-300 text-xs mt-1">{errors.profile.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-100">Email</label>
                  <Controller
                    name="profile.email"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="email"
                        className="mt-1 w-full p-2 bg-transparent border-b border-gray-300 text-white focus:border-cyan-300 outline-none transition-colors duration-200 placeholder:text-gray-300"
                        placeholder="Enter email"
                      />
                    )}
                  />
                  {errors.profile?.email && (
                    <p className="text-red-300 text-xs mt-1">{errors.profile.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-100">Username</label>
                  <Controller
                    name="profile.username"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="mt-1 w-full p-2 bg-transparent border-b border-gray-300 text-white focus:border-cyan-300 outline-none transition-colors duration-200 placeholder:text-gray-300"
                        placeholder="Enter username"
                      />
                    )}
                  />
                  {errors.profile?.username && (
                    <p className="text-red-300 text-xs mt-1">{errors.profile.username.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-100">Bio</label>
                  <Controller
                    name="profile.bio"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        className="mt-1 w-full p-2 bg-transparent border-b border-gray-300 text-white focus:border-cyan-300 outline-none transition-colors duration-200 placeholder:text-gray-300"
                        placeholder="Enter bio"
                      />
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-100">Avatar URL</label>
                  <Controller
                    name="profile.avatarUrl"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="mt-1 w-full p-2 bg-transparent border-b border-gray-300 text-white focus:border-cyan-300 outline-none transition-colors duration-200 placeholder:text-gray-300"
                        placeholder="Enter avatar URL"
                      />
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-100">Theme Preference</label>
                  <Controller
                    name="profile.themePreference"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="mt-1 w-full p-2 bg-gray-500/20 border-b border-gray-300 text-white focus:border-cyan-300 outline-none transition-colors duration-200"
                      >
                        <option value={ThemePreference.System}>System</option>
                        <option value={ThemePreference.Dark}>Dark</option>
                        <option value={ThemePreference.Light}>Light</option>
                      </select>
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-100">Language</label>
                  <Controller
                    name="profile.language"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="mt-1 w-full p-2 bg-gray-500/20 border-b border-gray-300 text-white focus:border-cyan-300 outline-none transition-colors duration-200"
                      >
                        <option value={LanguageOption.En}>English</option>
                        <option value={LanguageOption.Es}>Spanish</option>
                        <option value={LanguageOption.Fr}>French</option>
                      </select>
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-100">Notifications</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <Controller
                        name="profile.notifications.email"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="checkbox"
                            checked={field.value ?? true}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="h-4 w-4 text-cyan-300 focus:ring-cyan-300 border-gray-300 rounded"
                          />
                        )}
                      />
                      <span className="ml-2 text-sm font-light text-gray-100">Email Notifications</span>
                    </div>
                    <div className="flex items-center">
                      <Controller
                        name="profile.notifications.push"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="checkbox"
                            checked={field.value ?? true}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="h-4 w-4 text-cyan-300 focus:ring-cyan-300 border-gray-300 rounded"
                          />
                        )}
                      />
                      <span className="ml-2 text-sm font-light text-gray-100">Push Notifications</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-100">Data Usage</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <Controller
                        name="profile.dataUsage.backgroundSync"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="checkbox"
                            checked={field.value ?? false}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="h-4 w-4 text-cyan-300 focus:ring-cyan-300 border-gray-300 rounded"
                          />
                        )}
                      />
                      <span className="ml-2 text-sm font-light text-gray-100">Background Sync</span>
                    </div>
                    <div className="flex items-center">
                      <Controller
                        name="profile.dataUsage.activityLogs"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="checkbox"
                            checked={field.value ?? false}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="h-4 w-4 text-cyan-300 focus:ring-cyan-300 border-gray-300 rounded"
                          />
                        )}
                      />
                      <span className="ml-2 text-sm font-light text-gray-100">Activity Logs</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Fitness Section */}
            {activeSection === "fitness" && (
              <div className="grid grid-cols-2 gap-6 animate-fade-in">
                <div>
                  <label className="block text-sm font-light text-gray-100">Fitness Goal</label>
                  <Controller
                    name="exerciser.fitness_goal"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="mt-1 w-full p-2 bg-gray-500/20 border-b border-gray-300 text-white focus:border-cyan-300 outline-none transition-colors duration-200"
                      >
                        <option value="lose_weight">Lose Weight</option>
                        <option value="gain_muscle">Gain Muscle</option>
                        <option value="maintain_weight">Maintain Weight</option>
                        <option value="improve_endurance">Improve Endurance</option>
                        <option value="general_fitness">General Fitness</option>
                      </select>
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-100">Activity Level</label>
                  <Controller
                    name="exerciser.activity_level"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="mt-1 w-full p-2 bg-gray-500/20 border-b border-gray-300 text-white focus:border-cyan-300 outline-none transition-colors duration-200"
                      >
                        <option value="sedentary">Sedentary</option>
                        <option value="lightly_active">Lightly Active</option>
                        <option value="moderately_active">Moderately Active</option>
                        <option value="very_active">Very Active</option>
                        <option value="super_active">Super Active</option>
                      </select>
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-100">Preferred Exercise Types</label>
                  <Controller
                    name="exerciser.preferred_exercise_types"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        multiple
                        className="mt-1 w-full p-2 bg-gray-500/20 border-b border-gray-300 text-white focus:border-cyan-300 outline-none transition-colors duration-200"
                        value={field.value || []}
                        onChange={(e) => field.onChange(Array.from(e.target.selectedOptions, (option) => option.value))}
                      >
                        <option value="yoga">Yoga</option>
                        <option value="running">Running</option>
                        <option value="weightlifting">Weightlifting</option>
                        <option value="cycling">Cycling</option>
                        <option value="swimming">Swimming</option>
                      </select>
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-100">Height (cm)</label>
                  <Controller
                    name="exerciser.height_cm"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                        className="mt-1 w-full p-2 bg-transparent border-b border-gray-300 text-white focus:border-cyan-300 outline-none transition-colors duration-200 placeholder:text-gray-300"
                        placeholder="Enter height"
                      />
                    )}
                  />
                  {errors.exerciser?.height_cm && (
                    <p className="text-red-300 text-xs mt-1">{errors.exerciser.height_cm.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-100">Weight (kg)</label>
                  <Controller
                    name="exerciser.weight_kg"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                        className="mt-1 w-full p-2 bg-transparent border-b border-gray-300 text-white focus:border-cyan-300 outline-none transition-colors duration-200 placeholder:text-gray-300"
                        placeholder="Enter weight"
                      />
                    )}
                  />
                  {errors.exerciser?.weight_kg && (
                    <p className="text-red-300 text-xs mt-1">{errors.exerciser.weight_kg.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-100">Body Fat (%)</label>
                  <Controller
                    name="exerciser.body_fat_percentage"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                        className="mt-1 w-full p-2 bg-transparent border-b border-gray-300 text-white focus:border-cyan-300 outline-none transition-colors duration-200 placeholder:text-gray-300"
                        placeholder="Enter body fat percentage"
                      />
                    )}
                  />
                  {errors.exerciser?.body_fat_percentage && (
                    <p className="text-red-300 text-xs mt-1">{errors.exerciser.body_fat_percentage.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-100">Weekly Workouts</label>
                  <Controller
                    name="exerciser.weekly_workout_frequency"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                        className="mt-1 w-full p-2 bg-transparent border-b border-gray-300 text-white focus:border-cyan-300 outline-none transition-colors duration-200 placeholder:text-gray-300"
                        placeholder="Enter weekly workouts"
                      />
                    )}
                  />
                  {errors.exerciser?.weekly_workout_frequency && (
                    <p className="text-red-300 text-xs mt-1">{errors.exerciser.weekly_workout_frequency.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Investment Section */}
            {activeSection === "investment" && (
              <div className="grid grid-cols-2 gap-6 animate-fade-in">
                <div>
                  <label className="block text-sm font-light text-gray-100">Investment Goal</label>
                  <Controller
                    name="investor.investment_goal"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="mt-1 w-full p-2 bg-gray-500/20 border-b border-gray-300 text-white focus:border-cyan-300 outline-none transition-colors duration-200"
                      >
                        <option value="long_term_growth">Long-Term Growth</option>
                        <option value="income">Income</option>
                        <option value="capital_preservation">Capital Preservation</option>
                        <option value="speculation">Speculation</option>
                      </select>
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-100">Risk Tolerance</label>
                  <Controller
                    name="investor.risk_tolerance"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="mt-1 w-full p-2 bg-gray-500/20 border-b border-gray-300 text-white focus:border-cyan-300 outline-none transition-colors duration-200"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-100">Experience Level</label>
                  <Controller
                    name="investor.experience_level"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="mt-1 w-full p-2 bg-gray-500/20 border-b border-gray-300 text-white focus:border-cyan-300 outline-none transition-colors duration-200"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="experienced">Experienced</option>
                      </select>
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-100">Preferred Asset Classes</label>
                  <Controller
                    name="investor.preferred_asset_classes"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        multiple
                        className="mt-1 w-full p-2 bg-gray-500/20 border-b border-gray-300 text-white focus:border-cyan-300 outline-none transition-colors duration-200"
                        value={field.value || []}
                        onChange={(e) => field.onChange(Array.from(e.target.selectedOptions, (option) => option.value))}
                      >
                        <option value="stocks">Stocks</option>
                        <option value="bonds">Bonds</option>
                        <option value="etfs">ETFs</option>
                        <option value="real_estate">Real Estate</option>
                        <option value="crypto">Crypto</option>
                      </select>
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-100">Annual Investment Budget ($)</label>
                  <Controller
                    name="investor.annual_investment_budget"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                        className="mt-1 w-full p-2 bg-transparent border-b border-gray-300 text-white focus:border-cyan-300 outline-none transition-colors duration-200 placeholder:text-gray-300"
                        placeholder="Enter budget"
                      />
                    )}
                  />
                  {errors.investor?.annual_investment_budget && (
                    <p className="text-red-300 text-xs mt-1">{errors.investor.annual_investment_budget.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-100">Auto-Invest</label>
                  <Controller
                    name="investor.auto_invest_enabled"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        checked={field.value ?? false}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="mt-1 h-4 w-4 text-cyan-300 focus:ring-cyan-300 border-gray-300 rounded"
                      />
                    )}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-300 text-gray-900 py-2 rounded-lg font-semibold hover:bg-cyan-400 disabled:bg-gray-300 transition-colors duration-200"
            >
              {loading ? "Saving..." : "Save Settings"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;