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
  login: (props: SignIn) => Promise<{ token: string; user: User }>;
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
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [apiBaseUrl, setApiBaseUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        // Set API base URL
        const resolvedBaseUrl = await AuthController.testApiConnection();
        setApiBaseUrl(resolvedBaseUrl);

        // Only access localStorage in browser
        if (typeof window !== "undefined") {
          const savedToken = localStorage.getItem("token");
          const savedUser = localStorage.getItem("user");

          if (savedToken && savedUser) {
            try {
              const isValid = await AuthController.validToken(savedToken);
              if (isValid) {
                setToken(savedToken);
                setUser(JSON.parse(savedUser));
                axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
              } else {
                logout();
                router.push("/pages/sign-in"); // Redirect if token is invalid
              }
            } catch (err) {
              console.error("Error parsing user from localStorage:", err);
              logout();
              router.push("/pages/sign-in");
            }
          } else {
            router.push("/pages/sign-in"); // Redirect if no token or user
          }
        }
      } catch (err) {
        console.error("Error initializing auth:", err);
        setError("Failed to initialize authentication");
      } finally {
        setAuthLoading(false);
      }
    })();
  }, [router]);

  const login = async (props: SignIn) => {
    try {
      setError(null);
      const res = await AuthController.login(props);
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.token}`;
      return res;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Login failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
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
    if (!token || !user?.id) {
      setError("Missing token or user ID");
      throw new Error("Missing token or user ID");
    }
    try {
      setError(null);
      const updatedUser = await AuthController.updateUser(props, token);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to update user";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const validToken = async () => {
    if (!token) return false;
    return await AuthController.validToken(token);
  };

  const logout = (redirectTo: string = "/") => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    delete axios.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
    setError(null);
    router.push(redirectTo);
  };
  

  const deleteUser = async () => {
    if (!token || !user?.id) {
      setError("Missing token or user ID");
      throw new Error("Missing token or user ID");
    }
    try {
      setAuthLoading(true);
      setError(null);
      await AuthController.deleteUser(user.id);
      logout();
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user === null) {
      logout();
    }
  }, [authLoading, user]);
  

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