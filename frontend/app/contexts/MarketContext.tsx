// src/context/MarketContext.tsx
"use client";
"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AlphaVantage from '../controllers/alphaVantageController';
import { Ticker } from '../components/atoms/TickerLabel';

export type Company = Ticker & {
  name: string;
  marketCap?: number;
  sector?: string;
};
export type Stock = Company & {
  sharePrice: number;
  shareCount: number;
  movement: {
    intraday: number | string | any; // Allow intraday to store API response object
    daily: number | string;
    weekly: number | string;
    monthly: number | string;
    quarterly: number | string;
  };
};
export type Investment = Stock & {
  sharesOwned: number;
};

export type MarketTypes = Ticker | Company | Stock | Investment;

type MarketContextType = {
  selection: Partial<MarketTypes> | null;
  intradayData: any | null;
  intradayError: string | null;
  select: (val: Partial<MarketTypes>) => void;
  deselect: () => void;
  fetchIntraday: (symbol: string) => Promise<void>;
};

export const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const MarketProvider = ({ children }: { children: ReactNode }) => {
  const [selection, setSelection] = useState<Partial<MarketTypes> | null>(null);
  const [intradayData, setIntradayData] = useState<any | null>(null);
  const [intradayError, setIntradayError] = useState<string | null>(null);

  const alphaVantage = AlphaVantage();

  const select = (val: Partial<MarketTypes>) => {
    setSelection(val);
  };

  const deselect = () => {
    setSelection(null);
    setIntradayData(null);
    setIntradayError(null);
  };

  const fetchIntraday = async (symbol: string) => {
    try {
      setIntradayError(null);
      const response = await alphaVantage.IntraDay({
        symbol,
        interval: '5min',
        outputsize: 'compact'
      });
      if (response.error) {
        setIntradayError(response.error);
        setIntradayData(null);
      } else {
        setIntradayData(response.data);
      }
    } catch (error: any) {
      setIntradayError(error.message || 'Failed to fetch intraday data');
      setIntradayData(null);
    }
  };

  return (
    <MarketContext.Provider
      value={{
        selection,
        intradayData,
        intradayError,
        select,
        deselect,
        fetchIntraday
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return context;
};