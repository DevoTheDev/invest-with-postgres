// src/context/AuthContext.tsx
"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  validToken: () => Promise<boolean>;
  authLoading: boolean;
  apiBaseUrl: string;
}

type User = {
  _id: number | string;
  email: string;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Candidate ports to test
const PORTS = [4004, 3001];
const BASE_PATH = "/api";

let dynamicBaseURL = "";

const testApiConnection = async () => {
  for (const port of PORTS) {
    const url = `http://localhost:${port}${BASE_PATH}/ping`;
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        dynamicBaseURL = `http://localhost:${port}${BASE_PATH}`;
        break;
      }
    } catch (err) {
      // silently skip failed attempts
    }
  }

  if (!dynamicBaseURL) {
    console.error("❌ Failed to connect to any backend API.");
    dynamicBaseURL = `http://localhost:${PORTS[PORTS.length - 1]}${BASE_PATH}`;
  }

  return dynamicBaseURL;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [apiBaseUrl, setApiBaseUrl] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const resolvedBaseUrl = await testApiConnection();
      setApiBaseUrl(resolvedBaseUrl);
      validateTokenOnInit(resolvedBaseUrl);
    })();
  }, []);

  useEffect(() => {
    console.log("[USER] : ", user);
  }, [user]);

  const validateTokenOnInit = async (baseUrl: string) => {
    if (typeof window === "undefined") return;

    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      setAuthLoading(false);
      return;
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;

    const isValid = await validToken(baseUrl);
    if (isValid) {
      setToken(savedToken);
    } else {
      logout();
    }

    setAuthLoading(false);
  };

  const validToken = async (baseUrl: string = apiBaseUrl): Promise<boolean> => {
    try {
      const response = await axios.post(`${baseUrl}/users/refresh`);
      const { token, user } = response.data;
      if (response.status === 200) {
        if (typeof window !== "undefined") {
          localStorage.setItem("token", token);
        }
        setToken(token);
        setUser(user);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return true;
      }
      return false;
    } catch (error) {
      console.warn("Token validation failed:", error);
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${apiBaseUrl}/users/login`, { email, password });
      const { token, user } = res.data;
      if (!user) {
        throw new Error("Error receiving user on login.");
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }

      setToken(token);
      setUser(user);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  const register = async (email: string, password: string) => {
    try {
      await axios.post(`${apiBaseUrl}/users/register`, { email, password });
      await login(email, password); // Assuming login function exists
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout, validToken, authLoading, apiBaseUrl }}>
      {children}
    </AuthContext.Provider>
  );
};