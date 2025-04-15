// src/context/AuthContext.tsx
"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface AuthContextType {
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4004/api";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                try {
                    const payload = JSON.parse(atob(savedToken.split(".")[1]));
                    setToken(savedToken);
                    axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
                } catch (err) {
                    console.error("Invalid token");
                }
            }
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/users/login`, { email, password });
            const { token } = res.data;

            if (typeof window !== "undefined") {
                localStorage.setItem("token", token);
            }

            setToken(token);
            const payload = JSON.parse(atob(token.split(".")[1]));
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
        console.log("Logout clicked.")
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
        }
        delete axios.defaults.headers.common["Authorization"];
        setToken(null);
    };


    return (
        <AuthContext.Provider value={{ token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
