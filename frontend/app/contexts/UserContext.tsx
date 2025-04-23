"use client";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

export type UserProfile = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  birthday: string | null;
  created_at: string;
  updated_at: string;
};

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
  const { token, authLoading, apiBaseUrl, user, logout } = useAuth();
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
        id: String(res.data.user_id),
        email: res.data.email,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        phoneNumber: res.data.phoneNumber,
        birthday: res.data.birthday,
        created_at: res.data.created_at || new Date().toISOString(),
        updated_at: res.data.updated_at || new Date().toISOString(),
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
    if (!token || !apiBaseUrl || !user?._id) return;
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post(
        `${apiBaseUrl}/profiles`,
        {
          firstName: data.firstName || null,
          lastName: data.lastName || null,
          phoneNumber: data.phoneNumber || null,
          birthday: data.birthday || null,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile({
        id: String(user._id),
        email: user.email,
        firstName: res.data.profile.firstName,
        lastName: res.data.profile.lastName,
        phoneNumber: res.data.profile.phoneNumber,
        birthday: res.data.profile.birthday,
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
      setError('Missing token or user ID');
      throw new Error('Missing token or user ID');
    }
    try {
      setLoading(true);
      setError(null);
      const payload = {
        firstName: data.firstName !== '' ? data.firstName : null,
        lastName: data.lastName !== '' ? data.lastName : null,
        phoneNumber: data.phoneNumber !== '' ? data.phoneNumber : null,
        birthday: data.birthday !== '' ? data.birthday : null,
      };
      const res = await axios.put(`${apiBaseUrl}/profiles/${user._id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile({
        id: String(user._id),
        email: user.email,
        firstName: res.data.profile.firstName,
        lastName: res.data.profile.lastName,
        phoneNumber: res.data.profile.phoneNumber,
        birthday: res.data.profile.birthday,
        created_at: res.data.profile.created_at || profile?.created_at || new Date().toISOString(),
        updated_at: res.data.profile.updated_at || new Date().toISOString(),
      });
    } catch (err: any) {
      console.error('Failed to update profile', err);
      setError(err.response?.data?.message || 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProfile = async () => {
    if (!token || !apiBaseUrl || !user?._id) {
      setError('Missing token or user ID');
      throw new Error('Missing token or user ID');
    }
    try {
      setLoading(true);
      setError(null);
      await axios.delete(`${apiBaseUrl}/profiles/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(null);
    } catch (err: any) {
      console.error('Failed to delete profile', err);
      setError(err.response?.data?.message || 'Failed to delete profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    if (!token || !apiBaseUrl || !user?._id) {
      setError('Missing token or user ID');
      throw new Error('Missing token or user ID');
    }
    try {
      setLoading(true);
      setError(null);
      await axios.delete(`${apiBaseUrl}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(null);
      logout();
      deleteProfile();
      localStorage.removeItem('token');
      router.push('/pages/sign-in');
    } catch (err: any) {
      console.error('Failed to delete user', err);
      setError(err.response?.data?.message || 'Failed to delete user');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (user) {
      fetchProfile();
    } else {
      setLoading(false);
      if (!localStorage.getItem("token")) {
        router.push("/pages/sign-in");
      }
    }
  }, [token, authLoading, apiBaseUrl, user]);

  useEffect(() => {
    if (!user || !profile) {
      router.push("/");
    }
  }, [profile, user, router]);

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