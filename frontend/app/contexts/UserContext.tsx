"use client";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { UserProfile } from "../../../backend/src/types/shared/shared-types";

type UserContextType = {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  refetchProfile: () => Promise<void>;
  createProfile: (data: Partial<UserProfile>) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  deleteProfile: () => Promise<void>;
  deleteUser: () => Promise<void>;
};

export const UserContext = createContext<UserContextType>({
  profile: null,
  loading: true,
  error: null,
  refetchProfile: async () => {},
  createProfile: async () => {},
  updateProfile: async () => {},
  deleteProfile: async () => {},
  deleteUser: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { token, authLoading, apiBaseUrl, user, logout, validToken } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!token || !apiBaseUrl || !user?._id) return;
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${apiBaseUrl}/profiles/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile({
        id: String(res.data.profile.id || user._id),
        name: res.data.profile.name || "",
        email: user.email || res.data.profile.email,
        username: res.data.profile.username || "",
        bio: res.data.profile.bio || undefined,
        avatarUrl: res.data.profile.avatarUrl || undefined,
        themePreference: res.data.profile.themePreference || undefined,
        language: res.data.profile.language || undefined,
        notifications: {
          email: res.data.profile.notifications?.email ?? true,
          push: res.data.profile.notifications?.push ?? true,
        },
        dataUsage: {
          backgroundSync: res.data.profile.dataUsage?.backgroundSync ?? false,
          activityLogs: res.data.profile.dataUsage?.activityLogs ?? false,
        },
        isEmailVerified: res.data.profile.isEmailVerified ?? false,
        isActive: res.data.profile.isActive ?? true,
        created_at: res.data.profile.created_at || new Date().toISOString(),
        updated_at: res.data.profile.updated_at || new Date().toISOString(),
      });
    } catch (err: any) {
      if (err.response?.status === 404) {
        setProfile(null);
      } else {
        console.error("Failed to fetch profile", err);
        setError(err.response?.data?.message || "Failed to fetch profile");
      }
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (data: Partial<UserProfile>) => {
    if (!token || !apiBaseUrl || !user?._id) {
      setError("Missing token or user ID");
      throw new Error("Missing token or user ID");
    }
    try {
      setLoading(true);
      setError(null);
      const payload = {
        name: data.name || "",
        username: data.username || "",
        bio: data.bio || null,
        avatarUrl: data.avatarUrl || null,
        themePreference: data.themePreference || null,
        language: data.language || null,
        notifications: data.notifications || { email: true, push: true },
        dataUsage: data.dataUsage || { backgroundSync: false, activityLogs: false },
      };
      const res = await axios.post(`${apiBaseUrl}/profiles`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile({
        id: String(user._id),
        name: res.data.profile.name,
        email: user.email,
        username: res.data.profile.username,
        bio: res.data.profile.bio || undefined,
        avatarUrl: res.data.profile.avatarUrl || undefined,
        themePreference: res.data.profile.themePreference || undefined,
        language: res.data.profile.language || undefined,
        notifications: res.data.profile.notifications || { email: true, push: true },
        dataUsage: res.data.profile.dataUsage || { backgroundSync: false, activityLogs: false },
        isEmailVerified: res.data.profile.isEmailVerified ?? false,
        isActive: res.data.profile.isActive ?? true,
        created_at: res.data.profile.created_at || new Date().toISOString(),
        updated_at: res.data.profile.updated_at || new Date().toISOString(),
      });
    } catch (err: any) {
      console.error("Failed to create profile", err);
      setError(err.response?.data?.message || "Failed to create profile");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!token || !apiBaseUrl || !user?._id) {
      setError("Missing token or user ID");
      throw new Error("Missing token or user ID");
    }
    const isTokenValid = await validToken();
    if (!isTokenValid) {
      setError("Session expired. Please log in again.");
      logout();
      router.push("/pages/sign-in");
      throw new Error("Invalid token");
    }
    try {
      setLoading(true);
      setError(null);
      const payload = {
        name: data.name !== undefined ? data.name : profile?.name,
        username: data.username !== undefined ? data.username : profile?.username,
        bio: data.bio !== undefined ? data.bio : profile?.bio,
        avatarUrl: data.avatarUrl !== undefined ? data.avatarUrl : profile?.avatarUrl,
        themePreference: data.themePreference !== undefined ? data.themePreference : profile?.themePreference,
        language: data.language !== undefined ? data.language : profile?.language,
        notifications: data.notifications !== undefined ? data.notifications : profile?.notifications,
        dataUsage: data.dataUsage !== undefined ? data.dataUsage : profile?.dataUsage,
      };
      const res = await axios.put(`${apiBaseUrl}/profiles/${user._id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile({
        id: String(user._id),
        name: res.data.profile.name,
        email: user.email,
        username: res.data.profile.username,
        bio: res.data.profile.bio || undefined,
        avatarUrl: res.data.profile.avatarUrl || undefined,
        themePreference: res.data.profile.themePreference || undefined,
        language: res.data.profile.language || undefined,
        notifications: res.data.profile.notifications || { email: true, push: true },
        dataUsage: res.data.profile.dataUsage || { backgroundSync: false, activityLogs: false },
        isEmailVerified: res.data.profile.isEmailVerified ?? profile?.isEmailVerified,
        isActive: res.data.profile.isActive ?? profile?.isActive,
        created_at: profile?.created_at || new Date().toISOString(),
        updated_at: res.data.profile.updated_at || new Date().toISOString(),
      });
    } catch (err: any) {
      console.error("Failed to update profile", err);
      setError(err.response?.data?.message || "Failed to update profile");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProfile = async () => {
    if (!token || !apiBaseUrl || !user?._id) {
      setError("Missing token or user ID");
      throw new Error("Missing token or user ID");
    }
    const isTokenValid = await validToken();
    if (!isTokenValid) {
      setError("Session expired. Please log in again.");
      logout();
      router.push("/pages/sign-in");
      throw new Error("Invalid token");
    }
    try {
      setLoading(true);
      setError(null);
      await axios.delete(`${apiBaseUrl}/profiles/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(null);
    } catch (err: any) {
      console.error("Failed to delete profile", err);
      setError(err.response?.data?.message || "Failed to delete profile");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    if (!token || !apiBaseUrl || !user?._id) {
      setError("Missing token or user ID");
      throw new Error("Missing token or user ID");
    }
    const isTokenValid = await validToken();
    if (!isTokenValid) {
      setError("Session expired. Please log in again.");
      logout();
      router.push("/pages/sign-in");
      throw new Error("Invalid token");
    }
    try {
      setLoading(true);
      setError(null);
      await axios.delete(`${apiBaseUrl}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(null);
      logout();
      localStorage.removeItem("token");
      router.push("/pages/sign-in");
    } catch (err: any) {
      console.error("Failed to delete user", err);
      setError(err.response?.data?.message || "Failed to delete user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setProfile(null);
      setLoading(false);
    }
    if (!user && !localStorage.getItem("token")) {
      router.push("/pages/sign-in");
    } else if (!profile && user) {
      fetchProfile();
    }
  }, [token, authLoading, apiBaseUrl, user, profile, router]);

  return (
    <UserContext.Provider
      value={{
        profile,
        loading,
        error,
        refetchProfile: fetchProfile,
        createProfile,
        updateProfile,
        deleteProfile,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};