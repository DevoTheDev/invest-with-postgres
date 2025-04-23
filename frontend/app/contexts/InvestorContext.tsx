"use client";
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext'; // Assuming UserContext exists
import { useAuth } from '../hooks/useAuth';

type Investor = {
  user_id: number;
  watchlists: { id: number; title: string; tickers: string[] }[];
  investments: { id: number; name: string; ticker: string; shares: number; purchasePrice: number; lastInvestmentAdjustment: string }[];
};

type InvestorContextType = {
  investor: Investor | null;
  createInvestor: () => Promise<void>;
  fetchInvestor: () => Promise<void>;
};

const InvestorContext = createContext<InvestorContextType | undefined>(undefined);

export const InvestorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, token, apiBaseUrl } = useAuth();
  const [investor, setInvestor] = useState<Investor | null>(null);

  const fetchInvestor = async () => {
    if (!token || !user?._id) return;
    try {
      const res = await axios.get(`${apiBaseUrl}/api/investors/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInvestor(res.data.investor);
    } catch (err: any) {
      if (err.response?.status === 404) setInvestor(null);
      console.error('Failed to fetch investor:', err);
    }
  };

  const createInvestor = async () => {
    if (!token || !user?._id) return;
    try {
      const res = await axios.post(`${apiBaseUrl}/api/investors`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInvestor(res.data.investor);
    } catch (err) {
      console.error('Failed to create investor:', err);
    }
  };

  useEffect(() => {
    if (user?._id) fetchInvestor();
  }, [user, token]);

  return (
    <InvestorContext.Provider value={{ investor, createInvestor, fetchInvestor }}>
      {children}
    </InvestorContext.Provider>
  );
};

export const useInvestor = () => {
  const context = useContext(InvestorContext);
  if (!context) throw new Error('useInvestor must be used within InvestorProvider');
  return context;
};