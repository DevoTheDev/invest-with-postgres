import { Stock } from "@/app/contexts/MarketContext";

export const stocks: Stock[] = [
  {
    ticker: "AAPL",
    name: "Apple Inc.",
    marketCap: 2500000000000,
    sector: "Technology",
    sharePrice: 175.64,
    shareCount: 14200000000,
    movement: {
      intraday: 0.45,
      daily: 0.85,   
      weekly: 2.10,  
      monthly: 4.50, 
      quarterly: 8.20
    }
  },
  {
    ticker: "MSFT",
    name: "Microsoft Corporation",
    marketCap: 2150000000000,
    sector: "Technology",
    sharePrice: 300.35,
    shareCount: 7170000000,
    movement: {
      intraday: 0.60,
      daily: 1.12,   
      weekly: 3.25,  
      monthly: 6.80, 
      quarterly: 12.1
    }
  },
  {
    ticker: "AMZN",
    name: "Amazon.com, Inc.",
    marketCap: 1700000000000,
    sector: "Consumer Discretionary",
    sharePrice: 3402.45,
    shareCount: 500000000,
    movement: {
      intraday: -0.35,
      daily: -0.75,  
      weekly: -1.90, 
      monthly: -3.50,
      quarterly: -2.8
    }
  },
  {
    ticker: "GOOGL",
    name: "Alphabet Inc. (Google)",
    marketCap: 1800000000000,
    sector: "Communication Services",
    sharePrice: 2901.12,
    shareCount: 620000000,
    movement: {
      intraday: 0.30,
      daily: 0.65,   
      weekly: 1.80,  
      monthly: 3.90, 
      quarterly: 7.50
    }
  },
  {
    ticker: "TSLA",
    name: "Tesla, Inc.",
    marketCap: 830000000000,
    sector: "Consumer Discretionary",
    sharePrice: 700.23,
    shareCount: 1180000000,
    movement: {
      intraday: 1.20,
      daily: 2.30,   
      weekly: 6.50,  
      monthly: 12.30,
      quarterly: 18.9
    }
  },
  {
    ticker: "META",
    name: "Meta Platforms, Inc. (Facebook)",
    marketCap: 1000000000000,
    sector: "Communication Services",
    sharePrice: 350.21,
    shareCount: 2860000000,
    movement: {
      intraday: -0.50,
      daily: -1.20,  
      weekly: -2.80, 
      monthly: -5.60,
      quarterly: -8.4
    }
  },
  {
    ticker: "NFLX",
    name: "Netflix, Inc.",
    marketCap: 250000000000,
    sector: "Communication Services",
    sharePrice: 600.32,
    shareCount: 417000000,
    movement: {
      intraday: -0.40,
      daily: -0.95,  
      weekly: -2.30, 
      monthly: -4.80,
      quarterly: -6.7
    }
  },
  {
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    marketCap: 850000000000,
    sector: "Technology",
    sharePrice: 235.60,
    shareCount: 3600000000,
    movement: {
      intraday: 0.90,
      daily: 1.80,   
      weekly: 4.70,  
      monthly: 9.20, 
      quarterly: 14.5
    }
  },
  {
    ticker: "DIS",
    name: "The Walt Disney Company",
    marketCap: 300000000000,
    sector: "Communication Services",
    sharePrice: 175.60,
    shareCount: 1700000000,
    movement: {
      intraday: 0.25,
      daily: 0.45,   
      weekly: 1.20,  
      monthly: 2.80, 
      quarterly: 4.90
    }
  },
  {
    ticker: "V",
    name: "Visa Inc.",
    marketCap: 550000000000,
    sector: "Financials",
    sharePrice: 225.11,
    shareCount: 2450000000,
    movement: {
      intraday: 0.35,
      daily: 0.70,   
      weekly: 1.90,  
      monthly: 4.10, 
      quarterly: 7.80
    }
  },
  {
    ticker: "PYPL",
    name: "PayPal Holdings, Inc.",
    marketCap: 200000000000,
    sector: "Information Technology",
    sharePrice: 275.50,
    shareCount: 725000000,
    movement: {
      intraday: -0.60,
      daily: -1.50,  
      weekly: -3.40, 
      monthly: -6.90,
      quarterly: -9.5
    }
  },
  {
    ticker: "INTC",
    name: "Intel Corporation",
    marketCap: 220000000000,
    sector: "Technology",
    sharePrice: 52.45,
    shareCount: 4200000000,
    movement: {
      intraday: -0.30,
      daily: -0.60,  
      weekly: -1.50, 
      monthly: -3.20,
      quarterly: -5.4
    }
  },
  {
    ticker: "AMD",
    name: "Advanced Micro Devices, Inc.",
    marketCap: 150000000000,
    sector: "Technology",
    sharePrice: 108.30,
    shareCount: 1380000000,
    movement: {
      intraday: 0.70,
      daily: 1.25,   
      weekly: 3.60,  
      monthly: 7.80, 
      quarterly: 11.9
    }
  },
  {
    ticker: "SPOT",
    name: "Spotify Technology S.A.",
    marketCap: 47000000000,
    sector: "Communication Services",
    sharePrice: 278.56,
    shareCount: 169000000,
    movement: {
      intraday: -0.45,
      daily: -0.80,  
      weekly: -2.10, 
      monthly: -4.50,
      quarterly: -7.2
    }
  },
  {
    ticker: "TWTR",
    name: "Twitter, Inc.",
    marketCap: 52000000000,
    sector: "Communication Services",
    sharePrice: 61.20,
    shareCount: 850000000,
    movement: {
      intraday: 0.40,
      daily: 0.90,   
      weekly: 2.30,  
      monthly: 5.10, 
      quarterly: 8.60
    }
  },
  {
    ticker: "CSCO",
    name: "Cisco Systems, Inc.",
    marketCap: 250000000000,
    sector: "Technology",
    sharePrice: 54.10,
    shareCount: 4600000000,
    movement: {
      intraday: 0.20,
      daily: 0.50,   
      weekly: 1.40,  
      monthly: 3.30, 
      quarterly: 6.10
    }
  },
  {
    ticker: "ORCL",
    name: "Oracle Corporation",
    marketCap: 300000000000,
    sector: "Technology",
    sharePrice: 79.60,
    shareCount: 3760000000,
    movement: {
      intraday: 0.35,
      daily: 0.75,   
      weekly: 2.00,  
      monthly: 4.70, 
      quarterly: 8.90
    }
  },
  {
    ticker: "BA",
    name: "The Boeing Company",
    marketCap: 130000000000,
    sector: "Industrials",
    sharePrice: 229.98,
    shareCount: 560000000,
    movement: {
      intraday: -0.55,
      daily: -1.10,  
      weekly: -2.60, 
      monthly: -5.30,
      quarterly: -7.9
    }
  },
  {
    ticker: "JPM",
    name: "JPMorgan Chase & Co.",
    marketCap: 490000000000,
    sector: "Financials",
    sharePrice: 163.45,
    shareCount: 3000000000,
    movement: {
      intraday: 0.30,
      daily: 0.60,   
      weekly: 1.70,  
      monthly: 3.80, 
      quarterly: 7.20
    }
  },
  {
    ticker: "KO",
    name: "The Coca-Cola Company",
    marketCap: 240000000000,
    sector: "Consumer Staples",
    sharePrice: 53.80,
    shareCount: 4500000000,
    movement: {
      intraday: 0.15,
      daily: 0.30,   
      weekly: 0.80,  
      monthly: 1.90, 
      quarterly: 3.50
    }
  }
];