// src/context/MarketContext.tsx
"use client";
import { API_BASE_URL } from './AuthContext';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

type MarketContextType = {
  regions: string[];
  setRegions: React.Dispatch<React.SetStateAction<string[]>>;
  selection: any;
  fetchOverviews: (tickers: string[]) => Promise<void>;
};

export const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const MarketProvider = ({ children }: { children: ReactNode }) => {
  const [regions, setRegions] = useState<string[]>([]);
  const [selection, setSelection] = useState<any>(null);

  const fetchOverviews = async (tickers: string[]) => {
    try {
      // Make multiple requests in parallel using Promise.all
      const responses = await Promise.all(
        tickers.map(ticker =>
          axios.get(`${API_BASE_URL}/api/polygon-io/tickerOverview?ticker=${ticker}`)
        )
      );
  
      const overviewData = responses.map(response => response.data);
      console.log(overviewData);
  
    } catch (err) {
      console.error("Error fetching ticker overviews", err);
    }
  };

  return (
    <MarketContext.Provider
      value={{
        regions,
        setRegions,
        selection,
        fetchOverviews,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

