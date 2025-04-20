"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { API_BASE_URL } from "./AuthContext";
import { useAuth } from "../hooks/useAuth";

export type Ticker = {
  ticker: string;
}
export type Company = Ticker & {
  name: string,
  marketCap?: number,
  sector?: string
}
export type Stock = Company & {
  sharePrice: number
  shareCount: number;
}
export type Investment = Stock & {
  sharesOwned: number;
}

// Define UserProfile type
export type UserProfile = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  accountBalance?: number;
  isActive?: boolean;
  investments: Investment[];
  watchList?: Ticker[];
  transactions?: Object[]
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
  }
};

export const UserContext = createContext<UserContextType>({
  profile: null,
  loading: true,
  refetchProfile: async () => { },
  update: function (): {
    name: (firstName?: string, lastName?: string) => Promise<void>;
    email: (email?: string) => Promise<void>;
    balance: (newBalance: number) => Promise<void>;
    deactivate: () => Promise<any>;
    reactivate: () => Promise<any>;
  } {
    throw new Error("Function not implemented.");
  }
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { token, authLoading } = useAuth();
  const router = useRouter();
  const x = usePathname();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);


  const fetchProfile = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/users`, {
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
    if (!token) return;
    try {
      setLoading(true);
      const res = await axios.put(`${API_BASE_URL}/users`, updates, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(res.data.user); // Assuming the API responds with the updated user
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
      return updateProfile({ email })
    }
    function balance(newBalance: number) {
      return updateProfile({ accountBalance: newBalance })
    }
    function deactivate() {
      return updateProfile({ isActive: false });
    }
    function reactivate() {
      return updateProfile({ isActive: true })
    }
    return {
      name, email, balance, deactivate, reactivate
    }
  }

  useEffect(() => {
    console.log("Token:", token);
    console.log("Auth loading:", authLoading);
    // console.log("Profile:", profile);
    console.log("User loading:", loading);

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
  }, [token, authLoading]);

  return (
    <UserContext.Provider value={{ profile, loading, refetchProfile: fetchProfile, update, }}>
      {children}
    </UserContext.Provider>
  );
};
