export interface IntradayParams {
    symbol: string;
    interval: '1min' | '5min' | '15min' | '30min' | '60min';
    outputsize?: 'compact' | 'full';
    adjusted?: boolean;
    extended_hours?: boolean;
    month?: string; // Format: YYYY-MM, e.g., "2009-01"
    datatype?: 'json' | 'csv';
  }
  
  export interface DailyParams {
    symbol: string;
    outputsize?: 'compact' | 'full';
    datatype?: 'json' | 'csv';
  }
  
  export interface WeeklyMonthlyParams {
    symbol: string;
    datatype?: 'json' | 'csv';
  }
  
  export interface QuoteParams {
    symbol: string;
    datatype?: 'json' | 'csv';
  }
  
  export interface SearchParams {
    keywords: string;
    datatype?: 'json' | 'csv';
  }
  
  export interface HistoricalOptionsParams {
    symbol: string;
    date?: string; // Format: YYYY-MM-DD
    datatype?: 'json' | 'csv';
  }
  
  export interface NewsSentimentParams {
    tickers?: string;
    topics?: string;
    timeFrom?: string; // Format: YYYYMMDDTHHMM
    timeTo?: string; // Format: YYYYMMDDTHHMM
    sort?: 'LATEST' | 'EARLIEST' | 'RELEVANCE';
    limit?: number;
  }
  
  export interface ListingStatusParams {
    date?: string; // Format: YYYY-MM-DD
    state?: 'active' | 'delisted';
  }
  
  export interface AnalyticsFixedWindowParams {
    symbols: string;
    range: string;
    interval: string;
    calculations: string;
  }