"use client";
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

export type AlphaVantageRoutes =
  | '/intraday'
  | '/daily'
  | '/weekly'
  | '/monthly'
  | '/quote'
  | '/search'
  | '/market-status'
  | '/historical-options'
  | '/news-sentiment'
  | '/top-gainers-losers'
  | '/insider-transactions'
  | '/analytics'
  | '/listing-status';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

/**
 * Common query parameters shared across multiple Alpha Vantage routes.
 */
interface CommonQueryParams {
  datatype?: 'json' | 'csv';
  symbol: string;

}

/**
 * Query parameters for the /intraday route.
 */
interface IntradayQueryParams extends CommonQueryParams {
  interval: '1min' | '5min' | '15min' | '30min' | '60min';
  outputsize?: 'compact' | 'full';
  adjusted?: boolean;
  extended_hours?: boolean;
  month?: string; // Format: YYYY-MM
}

/**
 * Query parameters for the /daily route.
 */
interface DailyQueryParams extends CommonQueryParams {
  outputsize?: 'compact' | 'full';
}

/**
 * Query parameters for the /weekly route.
 */
interface WeeklyQueryParams extends CommonQueryParams {}

/**
 * Query parameters for the /monthly route.
 */
interface MonthlyQueryParams extends CommonQueryParams {}

/**
 * Query parameters for the /quote route.
 */
interface QuoteQueryParams extends CommonQueryParams {}

/**
 * Query parameters for the /search route.
 */
interface SearchQueryParams extends CommonQueryParams {
  keywords: string;
}

/**
 * Query parameters for the /historical-options route.
 */
interface HistoricalOptionsQueryParams extends CommonQueryParams {
  date?: string; // Format: YYYY-MM-DD
}

/**
 * Query parameters for the /news-sentiment route.
 */
interface NewsSentimentQueryParams {
  tickers?: string;
  topics?: string;
  timeFrom?: string; // Format: YYYYMMDDTHHMM
  timeTo?: string; // Format: YYYYMMDDTHHMM
  sort?: 'LATEST' | 'EARLIEST' | 'RELEVANCE';
  limit?: number;
}

/**
 * Query parameters for the /insider-transactions route.
 */
interface InsiderTransactionsQueryParams extends CommonQueryParams {}

/**
 * Query parameters for the /analytics route.
 */
interface AnalyticsQueryParams {
  symbols: string;
  range: string;
  interval: string;
  calculations: string;
}

/**
 * Query parameters for the /listing-status route.
 */
interface ListingStatusQueryParams {
  date?: string; // Format: YYYY-MM-DD
  state?: 'active' | 'delisted';
}

/**
 * Factory function to create an Alpha Vantage API client with typed route methods.
 * @returns Object containing methods for each Alpha Vantage API route.
 */
const AlphaVantage = () => {
  const { apiBaseUrl } = useAuth();

  /**
   * Makes a GET request to a specified Alpha Vantage API endpoint.
   * @param route - The API route to call.
   * @param params - Query parameters for the request.
   * @returns Promise resolving to an ApiResponse with data or error.
   */
  const makeApiRequest = async <T>(
    route: AlphaVantageRoutes,
    params?: any
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await axios.get(`${apiBaseUrl}/alpha-vantage${route}`, { params });
      return { data: response.data };
    } catch (error: any) {
      return { error: error.response?.data?.error || error.message || `Failed to fetch data from ${route}` };
    }
  };

  /**
   * Fetches intraday time series data from the backend API.
   * @param params - Query parameters for the intraday request.
   * @returns Promise resolving to an ApiResponse with data or error.
   */
  function IntraDay(params: IntradayQueryParams): Promise<ApiResponse<any>> {
    if (!params.symbol || !params.interval) {
      return Promise.resolve({ error: 'Symbol and interval are required' });
    }
    return makeApiRequest('/intraday', params);
  }

  /**
   * Fetches daily time series data from the backend API.
   * @param params - Query parameters for the daily request.
   * @returns Promise resolving to an ApiResponse with data or error.
   */
  function Daily(params: DailyQueryParams): Promise<ApiResponse<any>> {
    if (!params.symbol) {
      return Promise.resolve({ error: 'Symbol is required' });
    }
    return makeApiRequest('/daily', params);
  }

  /**
   * Fetches weekly time series data from the backend API.
   * @param params - Query parameters for the weekly request.
   * @returns Promise resolving to an ApiResponse with data or error.
   */
  function Weekly(params: WeeklyQueryParams): Promise<ApiResponse<any>> {
    if (!params.symbol) {
      return Promise.resolve({ error: 'Symbol is required' });
    }
    return makeApiRequest('/weekly', params);
  }

  /**
   * Fetches monthly time series data from the backend API.
   * @param params - Query parameters for the monthly request.
   * @returns Promise resolving to an ApiResponse with data or error.
   */
  function Monthly(params: MonthlyQueryParams): Promise<ApiResponse<any>> {
    if (!params.symbol) {
      return Promise.resolve({ error: 'Symbol is required' });
    }
    return makeApiRequest('/monthly', params);
  }

  /**
   * Fetches global quote data from the backend API.
   * @param params - Query parameters for the quote request.
   * @returns Promise resolving to an ApiResponse with data or error.
   */
  function Quote(params: QuoteQueryParams): Promise<ApiResponse<any>> {
    if (!params.symbol) {
      return Promise.resolve({ error: 'Symbol is required' });
    }
    return makeApiRequest('/quote', params);
  }

  /**
   * Searches for symbols based on keywords using the backend API.
   * @param params - Query parameters for the search request.
   * @returns Promise resolving to an ApiResponse with data or error.
   */
  function Search(params: SearchQueryParams): Promise<ApiResponse<any>> {
    if (!params.keywords) {
      return Promise.resolve({ error: 'Keywords are required' });
    }
    return makeApiRequest('/search', params);
  }

  /**
   * Fetches current market status from the backend API.
   * @returns Promise resolving to an ApiResponse with data or error.
   */
  function MarketStatus(): Promise<ApiResponse<any>> {
    return makeApiRequest('/market-status');
  }

  /**
   * Fetches historical options data from the backend API.
   * @param params - Query parameters for the historical options request.
   * @returns Promise resolving to an ApiResponse with data or error.
   */
  function HistoricalOptions(params: HistoricalOptionsQueryParams): Promise<ApiResponse<any>> {
    if (!params.symbol) {
      return Promise.resolve({ error: 'Symbol is required' });
    }
    return makeApiRequest('/historical-options', params);
  }

  /**
   * Fetches news sentiment data from the backend API.
   * @param params - Query parameters for the news sentiment request.
   * @returns Promise resolving to an ApiResponse with data or error.
   */
  function NewsSentiment(params: NewsSentimentQueryParams): Promise<ApiResponse<any>> {
    if (params.limit && (params.limit < 1 || params.limit > 1000)) {
      return Promise.resolve({ error: 'Limit must be between 1 and 1000' });
    }
    return makeApiRequest('/news-sentiment', params);
  }

  /**
   * Fetches top gainers and losers data from the backend API.
   * @returns Promise resolving to an ApiResponse with data or error.
   */
  function TopGainersLosers(): Promise<ApiResponse<any>> {
    return makeApiRequest('/top-gainers-losers');
  }

  /**
   * Fetches insider transactions data from the backend API.
   * @param params - Query parameters for the insider transactions request.
   * @returns Promise resolving to an ApiResponse with data or error.
   */
  function InsiderTransactions(params: InsiderTransactionsQueryParams): Promise<ApiResponse<any>> {
    if (!params.symbol) {
      return Promise.resolve({ error: 'Symbol is required' });
    }
    return makeApiRequest('/insider-transactions', params);
  }

  /**
   * Fetches fixed-window analytics data from the backend API.
   * @param params - Query parameters for the analytics request.
   * @returns Promise resolving to an ApiResponse with data or error.
   */
  function Analytics(params: AnalyticsQueryParams): Promise<ApiResponse<any>> {
    if (!params.symbols || !params.range || !params.interval || !params.calculations) {
      return Promise.resolve({ error: 'Symbols, range, interval, and calculations are required' });
    }
    return makeApiRequest('/analytics', params);
  }

  /**
   * Fetches listing status data from the backend API.
   * @param params - Query parameters for the listing status request.
   * @returns Promise resolving to an ApiResponse with data or error.
   */
  function ListingStatus(params: ListingStatusQueryParams = {}): Promise<ApiResponse<any>> {
    return makeApiRequest('/listing-status', params);
  }

  return {
    IntraDay,
    Daily,
    Weekly,
    Monthly,
    Quote,
    Search,
    MarketStatus,
    HistoricalOptions,
    NewsSentiment,
    TopGainersLosers,
    InsiderTransactions,
    Analytics,
    ListingStatus
  };
};

export default AlphaVantage;