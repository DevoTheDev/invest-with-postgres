// src/context/AuthContext.tsx
"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import * as AuthController from "@/app/controllers/AuthController";

type SignIn = { email: string; password: string };
type User = { id: string; email: string };

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (props: SignIn) => Promise<{
    token: string;
    user: User;
}>;
  register: (props: SignIn) => Promise<void>;
  logout: () => void;
  deleteUser: () => Promise<void>;
  updateUser: (props: { email?: string; password?: string }) => Promise<void>;
  validToken: () => Promise<boolean>;
  authLoading: boolean;
  apiBaseUrl: string;
  error: string | null;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [apiBaseUrl, setApiBaseUrl] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const resolvedBaseUrl = await AuthController.testApiConnection();
      setApiBaseUrl(resolvedBaseUrl);
      await AuthController.validateTokenOnInit();
      setAuthLoading(false);
    })();
  }, []);

  const login = async (props: SignIn) => {
    const res = await AuthController.login(props);
    setToken(res.token);
    localStorage.setItem("token", res.token);
    setUser(res.user);
    router.push("/");
    return res;
  };

  const register = async (props: SignIn) => {
    try {
      setError(null);
      await AuthController.register(props);
      await login(props);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateUser = async (props: { email?: string; password?: string }) => {
    if (!token || !apiBaseUrl || !user?.id) {
      setError("Missing token or user ID");
      throw new Error("Missing token or user ID");
    }

    try {
      setError(null);
      await AuthController.updateUser(props, token);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to update user";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const validToken = async (): Promise<boolean> => {
    return await AuthController.validToken(token || "");
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    setToken(null);
    setError(null);
    router.push("/pages/sign-in");
  };

  const deleteUser = async () => {
    if (!token || !apiBaseUrl || !user?.id) {
      setError("Missing token or user ID");
      throw new Error("Missing token or user ID");
    }

    try {
      setAuthLoading(true);
      setError(null);
      await AuthController.deleteUser(user.id);
      router.push("/pages/sign-in");
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      const savedToken = localStorage.getItem("token");
  
      if (!savedToken) {
        router.push("/pages/sign-in");
        return;
      }
  
      const isValid = await AuthController.validToken(savedToken);
  
      if (!isValid) {
        router.push("/pages/sign-in");
      } else {
        setToken(savedToken);
      }
    };
  
    checkToken();
  }, []);
  
  

  return (
    <AuthContext.Provider
      value={{
    token,
    user,
    login,
    register,
    logout,
    updateUser,
    validToken,
    authLoading,
    apiBaseUrl,
    error,
    deleteUser,
  }}
    >
      {children}
    </AuthContext.Provider>
  );
};