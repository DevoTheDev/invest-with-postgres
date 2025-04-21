"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { Investment } from "./MarketContext";
import { useAuth } from "../hooks/useAuth";

export type UserProfile = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  accountBalance?: number;
  isActive?: boolean;
  investments: Investment[];
};

type UserContextType = {
  profile: UserProfile | null;
  loading: boolean;
  refetchProfile: () => Promise<void>;
  update: () => {
    name: (firstName?: string, lastName?: string) => Promise<void>;
    email: (email?: string) => Promise<void>;
    balance: (newBalance: number) => Promise<void>;
    deactivate: () => Promise<any>;
    reactivate: () => Promise<any>;
  };
};

export const UserContext = createContext<UserContextType>({
  profile: null,
  loading: true,
  refetchProfile: async () => {},
  update: () => {
    throw new Error("Function not implemented.");
  },
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { token, authLoading, apiBaseUrl } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    if (!token || !apiBaseUrl) return;
    try {
      setLoading(true);
      const res = await axios.get(`${apiBaseUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(res.data);
    } catch (err) {
      console.error("Failed to fetch user profile", err);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!token || !apiBaseUrl) return;
    try {
      setLoading(true);
      const res = await axios.put(`${apiBaseUrl}/users`, updates, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(res.data.user);
    } catch (err) {
      console.error("Failed to update user profile", err);
    } finally {
      setLoading(false);
    }
  };

  const update = () => {
    function name(firstName?: string, lastName?: string) {
      return updateProfile({ firstName, lastName });
    }
    function email(email?: string) {
      return updateProfile({ email });
    }
    function balance(newBalance: number) {
      return updateProfile({ accountBalance: newBalance });
    }
    function deactivate() {
      return updateProfile({ isActive: false });
    }
    function reactivate() {
      return updateProfile({ isActive: true });
    }
    return { name, email, balance, deactivate, reactivate };
  };

  useEffect(() => {
    if (authLoading) return;

    if (token) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
      if (!localStorage.getItem("token") || profile == null) {
        router.push("/pages/sign-in");
      }
    }
  }, [token, authLoading, apiBaseUrl]);

  return (
    <UserContext.Provider
      value={{ profile, loading, refetchProfile: fetchProfile, update }}
    >
      {children}
    </UserContext.Provider>
  );
};
