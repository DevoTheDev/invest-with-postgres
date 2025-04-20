// src/context/AuthContext.tsx
"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface AuthContextType {
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
    validToken: () => Promise<boolean>;
    authLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4004/api";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        validateTokenOnInit();
    }, []);

    const validateTokenOnInit = async () => {
        if (typeof window === "undefined") return;

        const savedToken = localStorage.getItem("token");
        if (!savedToken) {
            setAuthLoading(false);
            return;
        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;

        const isValid = await validToken();
        if (isValid) {
            setToken(savedToken);
        } else {
            logout();
        }

        setAuthLoading(false);
    };

    const validToken = async (): Promise<boolean> => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/me`);
            return response.status === 200;
        } catch (error) {
            console.warn("Token validation failed:", error);
            return false;
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/users/login`, { email, password });
            const { token } = res.data;

            if (typeof window !== "undefined") {
                localStorage.setItem("token", token);
            }

            setToken(token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } catch (err: any) {
            throw new Error(err.response?.data?.message || "Login failed");
        }
    };

    const register = async (email: string, password: string) => {
        try {
            await axios.post(`${API_BASE_URL}/users/register`, { email, password });
        } catch (err: any) {
            throw new Error(err.response?.data?.message || "Registration failed");
        }
    };

    const logout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
        }
        delete axios.defaults.headers.common["Authorization"];
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, register, logout, validToken, authLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
