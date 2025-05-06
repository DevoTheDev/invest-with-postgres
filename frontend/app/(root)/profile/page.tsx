"use client";
import React, { useRef, useEffect, useState } from "react";
import { useUser } from "@/app/hooks/useUser";
import { useAuth } from "@/app/hooks/useAuth";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserProfile } from "../../../backend/src/types/shared/shared-types";
import { formatHeader } from "@/app/utils/stringUtils";
import clsx from "clsx";

const sections = [
  { id: "profile", label: "Profile Info" },
  { id: "settings", label: "Settings" },
  { id: "account", label: "Account" },
];

const Page = () => {
  const { profile, loading, error, updateProfile, deleteUser } = useUser();
  const { logout } = useAuth();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<UserProfile>({
    defaultValues: profile || undefined,
  });
  const [activeSection, setActiveSection] = useState<string>("profile");
  const [formError, setFormError] = useState<string | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: "-10% 0px -10% 0px" }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (profile) {
      reset(profile);
    }
  }, [profile, reset]);

  const onSubmit: SubmitHandler<UserProfile> = async (data) => {
    try {
      setFormError(null);
      await updateProfile(data);
    } catch (err: any) {
      setFormError(err.message || "Failed to update profile");
    }
  };

  const handleLogout = async () => {
    try {
      logout();
    } catch (err: any) {
      setFormError(err.message || "Failed to log out");
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to permanently delete your account? This cannot be undone.")) {
      try {
        await deleteUser();
      } catch (err: any) {
        setFormError(err.message || "Failed to delete account");
      }
    }
  };

  const handleResetPassword = async () => {
    alert("Password reset link would be sent to your email.");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <div className="text-center text-gray-300 text-lg">
          <svg
            className="animate-spin h-8 w-8 text-cyan-200 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <div className="text-center text-gray-300 text-lg">No profile found. Please create a profile.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-800 text-gray-300 font-light">
      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-gray-900/80 backdrop-blur-sm border-r border-gray-700 px-6 py-10 space-y-6 sticky top-0">
        <div className="fixed w-4/5" >
        <h2 className="text-xl font-thin text-cyan-200 text-center mb-8 tracking-wider">Menu</h2>
        {sections.map(({ id, label }) => (
          <a
          key={id}
          href={`#${id}`}
          className={clsx(
            "block px-4 py-3 rounded-xl text-lg transition-all duration-300",
            activeSection === id
            ? "bg-gray-700/50 text-cyan-200 shadow-md"
            : "hover:bg-gray-700 hover:text-cyan-100 text-gray-400"
            )}
            >
            {label}
          </a>
        ))}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 h-full overflow-y-auto p-12 space-y-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-16">
          {/* Profile Info Section */}
          <section
            id="profile"
            ref={(el: HTMLDivElement | null) => {
              sectionRefs.current["profile"] = el;
            }}
            className="space-y-8 min-h-[60vh] max-w-4xl w-full"
          >
            <h3 className="text-3xl font-bold text-cyan-200 tracking-wide">Profile Info</h3>
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-3xl shadow-xl p-10 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {["name", "username", "email", "bio"].map((key) => (
                  <div key={key} className="flex flex-col gap-2 relative">
                    <label className="text-sm text-gray-400">{formatHeader(key)}</label>
                    <input
                      {...register(key as keyof UserProfile, {
                        required: key !== "bio" ? `${formatHeader(key)} is required` : false,
                        minLength: key === "username" ? { value: 3, message: "Username must be at least 3 characters" } : undefined,
                        pattern: key === "email" ? { value: /\S+@\S+\.\S+/, message: "Invalid email address" } : undefined,
                      })}
                      className="bg-gray-700/50 border border-gray-600 text-gray-100 placeholder-gray-400 px-5 py-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-cyan-400/50 focus:border-cyan-300 transition-all duration-300 text-lg"
                      placeholder={key === "bio" ? "Tell us about yourself" : `Enter your ${key}`}
                    />
                    {errors[key as keyof UserProfile] && (
                      <p className="text-sm text-red-400 absolute -bottom-6 left-2">
                        {errors[key as keyof UserProfile]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              {formError && (
                <div className="text-sm text-red-400 text-center bg-gray-700/30 py-2 px-4 rounded-xl">{formError}</div>
              )}
              {error && (
                <div className="text-sm text-red-400 text-center bg-gray-700/30 py-2 px-4 rounded-xl">{error}</div>
              )}
            </div>
          </section>
          {/* Settings Section */}
          <section
            id="settings"
            ref={(el: HTMLDivElement | null) => {
              sectionRefs.current["settings"] = el;
            }}
            className="space-y-8 min-h-[60vh] max-w-4xl w-full"
          >
            <h3 className="text-3xl font-bold text-cyan-200 tracking-wide">Settings</h3>
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-3xl shadow-xl p-10 space-y-8">
              {/* Theme Preferences */}
              <div className="space-y-4">
                <h4 className="text-xl text-gray-100">Theme Preferences</h4>
                <div className="flex items-center space-x-4">
                  <label className="text-gray-400">Theme</label>
                  <select
                    {...register("themePreference")}
                    className="bg-gray-700/50 border border-gray-600 text-gray-100 px-5 py-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-cyan-400/50 focus:border-cyan-300 transition-all duration-300 text-lg"
                  >
                    <option value="system">System Default</option>
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                  </select>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="space-y-4">
                <h4 className="text-xl text-gray-100">Notification Settings</h4>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Email Notifications</span>
                  <input
                    type="checkbox"
                    {...register("notifications.email")}
                    className="w-6 h-6 text-cyan-300 bg-gray-700 border-gray-600 rounded focus:ring-cyan-400/50"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Push Notifications</span>
                  <input
                    type="checkbox"
                    {...register("notifications.push")}
                    className="w-6 h-6 text-cyan-300 bg-gray-700 border-gray-600 rounded focus:ring-cyan-400/50"
                  />
                </div>
              </div>

              {/* Language */}
              <div className="space-y-4">
                <h4 className="text-xl text-gray-100">Language</h4>
                <div className="flex items-center space-x-4">
                  <label className="text-gray-400">Preferred Language</label>
                  <select
                    {...register("language")}
                    className="bg-gray-700/50 border border-gray-600 text-gray-100 px-5 py-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-cyan-400/50 focus:border-cyan-300 transition-all duration-300 text-lg"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
              </div>

              {/* Data Preferences */}
              <div className="space-y-4">
                <h4 className="text-xl text-gray-100">Data Usage</h4>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Allow background sync</span>
                  <input
                    type="checkbox"
                    {...register("dataUsage.backgroundSync")}
                    className="w-6 h-6 text-cyan-300 bg-gray-700 border-gray-600 rounded focus:ring-cyan-400/50"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Save activity logs</span>
                  <input
                    type="checkbox"
                    {...register("dataUsage.activityLogs")}
                    className="w-6 h-6 text-cyan-300 bg-gray-700 border-gray-600 rounded focus:ring-cyan-400/50"
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-end max-w-4xl w-full">
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative flex items-center justify-center px-8 py-3 bg-cyan-400 text-gray-900 text-lg font-semibold rounded-xl hover:bg-cyan-300 focus:outline-none focus:ring-4 focus:ring-cyan-200/50 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
            >
              {isSubmitting ? (
                <span className="absolute left-3 flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 text-gray-900"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </span>
              ) : null}
              Save Profile
            </button>
          </div>
        </form>

        {/* Account Section */}
        <section
          id="account"
          ref={(el: HTMLDivElement | null) => {
            sectionRefs.current["account"] = el;
          }}
          className="space-y-8 min-h-[60vh] max-w-xl w-full"
        >
          <h3 className="text-3xl font-bold text-cyan-200 tracking-wide">Account</h3>
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-3xl shadow-xl p-10 space-y-8">
            {/* Reset Password */}
            <div className="flex flex-col gap-3">
              <label className="text-sm text-gray-400">Reset Password</label>
              <button
                onClick={handleResetPassword}
                className="self-start px-6 py-3 bg-cyan-400 text-gray-900 text-lg font-semibold rounded-xl hover:bg-cyan-300 focus:outline-none focus:ring-4 focus:ring-cyan-200/50 transition-all duration-300 transform hover:scale-105"
              >
                Send Reset Link
              </button>
            </div>

            {/* Logout */}
            <div className="flex flex-col gap-3 border-t border-gray-700 pt-6">
              <label className="text-sm text-gray-400">Log out of your account</label>
              <button
                onClick={handleLogout}
                className="self-start px-6 py-3 bg-gray-700 text-gray-100 text-lg font-semibold rounded-xl hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-cyan-200/50 transition-all duration-300 transform hover:scale-105"
              >
                Logout
              </button>
            </div>

            {/* Delete Account */}
            <div className="flex flex-col gap-3 border-t border-gray-700 pt-6">
              <label className="text-sm text-red-400">Permanently delete your account</label>
              <button
                onClick={handleDeleteAccount}
                className="self-start px-6 py-3 bg-red-500 text-gray-100 text-lg font-semibold rounded-xl hover:bg-red-400 focus:outline-none focus:ring-4 focus:ring-red-200/50 transition-all duration-300 transform hover:scale-105"
              >
                Delete Account
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Page;