// src/controllers/alphaVantageController.ts
import { Request, Response } from 'express';
import {
  fetchIntradayData,
  fetchDailyData,
  fetchWeeklyData,
  fetchMonthlyData,
  fetchQuote,
  searchSymbols,
  fetchMarketStatus,
  fetchHistoricalOptions,
  fetchNewsSentiment,
  fetchTopGainersLosers,
  fetchInsiderTransactions,
  fetchAnalyticsFixedWindow,
  fetchListingStatus
} from '../services/AlphaVantage';

/**
 * Fetches intraday time series data for a specified equity.
 * @param req - Express request object with query parameters.
 * @param res - Express response object.
 */
export const getIntradayData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { symbol, interval, outputsize, adjusted, extended_hours, month, datatype } = req.query;

    if (!symbol || !interval) {
      res.status(400).json({ error: 'Symbol and interval are required.' });
      return;
    }

    const data = await fetchIntradayData({
      symbol: symbol as string,
      interval: interval as '1min' | '5min' | '15min' | '30min' | '60min',
      outputsize: outputsize as 'compact' | 'full' | undefined,
      adjusted: adjusted ? adjusted === 'true' : undefined,
      extended_hours: extended_hours ? extended_hours === 'true' : undefined,
      month: month as string | undefined,
      datatype: datatype as 'json' | 'csv' | undefined
    });

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error fetching intraday data' });
  }
};

/**
 * Fetches daily time series data for a specified equity.
 * @param req - Express request object with query parameters.
 * @param res - Express response object.
 */
export const getDailyData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { symbol, outputsize, datatype } = req.query;

    if (!symbol) {
      res.status(400).json({ error: 'Symbol is required.' });
      return;
    }

    const data = await fetchDailyData({
      symbol: symbol as string,
      outputsize: outputsize as 'compact' | 'full' | undefined,
      datatype: datatype as 'json' | 'csv' | undefined
    });

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error fetching daily data' });
  }
};

/**
 * Fetches weekly time series data for a specified equity.
 * @param req - Express request object with query parameters.
 * @param res - Express response object.
 */
export const getWeeklyData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { symbol, datatype } = req.query;

    if (!symbol) {
      res.status(400).json({ error: 'Symbol is required.' });
      return;
    }

    const data = await fetchWeeklyData({
      symbol: symbol as string,
      datatype: datatype as 'json' | 'csv' | undefined
    });

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error fetching weekly data' });
  }
};

/**
 * Fetches monthly time series data for a specified equity.
 * @param req - Express request object with query parameters.
 * @param res - Express response object.
 */
export const getMonthlyData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { symbol, datatype } = req.query;

    if (!symbol) {
      res.status(400).json({ error: 'Symbol is required.' });
      return;
    }

    const data = await fetchMonthlyData({
      symbol: symbol as string,
      datatype: datatype as 'json' | 'csv' | undefined
    });

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error fetching monthly data' });
  }
};

/**
 * Fetches global quote data for a specified equity.
 * @param req - Express request object with query parameters.
 * @param res - Express response object.
 */
export const getQuote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { symbol, datatype } = req.query;

    if (!symbol) {
      res.status(400).json({ error: 'Symbol is required.' });
      return;
    }

    const data = await fetchQuote({
      symbol: symbol as string,
      datatype: datatype as 'json' | 'csv' | undefined
    });

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error fetching quote data' });
  }
};

/**
 * Searches for symbols based on keywords.
 * @param req - Express request object with query parameters.
 * @param res - Express response object.
 */
export const searchForSymbols = async (req: Request, res: Response): Promise<void> => {
  try {
    const { keywords, datatype } = req.query;

    if (!keywords) {
      res.status(400).json({ error: 'Keywords are required.' });
      return;
    }

    const data = await searchSymbols({
      keywords: keywords as string,
      datatype: datatype as 'json' | 'csv' | undefined
    });

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error searching symbols' });
  }
};

/**
 * Fetches current market status.
 * @param req - Express request object.
 * @param res - Express response object.
 */
export const getMarketStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await fetchMarketStatus();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error fetching market status' });
  }
};

/**
 * Fetches historical options data for a specified equity.
 * @param req - Express request object with query parameters.
 * @param res - Express response object.
 */
export const getHistoricalOptions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { symbol, date, datatype } = req.query;

    if (!symbol) {
      res.status(400).json({ error: 'Symbol is required.' });
      return;
    }

    
    const data = await fetchHistoricalOptions({
      symbol: symbol as string,
      date: date as string | undefined,
      datatype: datatype as 'json' | 'csv' | undefined
    });
    
    console.log(data)
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error fetching historical options' });
  }
};

/**
 * Fetches news sentiment data for specified tickers or topics.
 * @param req - Express request object with query parameters.
 * @param res - Express response object.
 */
export const getNewsSentiment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tickers, topics, timeFrom, timeTo, sort, limit } = req.query;

    const limitNum = limit ? parseInt(limit as string) : undefined;
    if ((limit && limitNum) && (isNaN(limitNum) || limitNum < 1 || limitNum > 1000)) {
      res.status(400).json({ error: 'Limit must be a number between 1 and 1000.' });
      return;
    }

    const data = await fetchNewsSentiment({
      tickers: tickers as string | undefined,
      topics: topics as string | undefined,
      timeFrom: timeFrom as string | undefined,
      timeTo: timeTo as string | undefined,
      sort: sort as 'LATEST' | 'EARLIEST' | 'RELEVANCE' | undefined,
      limit: limitNum
    });

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error fetching news sentiment' });
  }
};

/**
 * Fetches top gainers and losers data.
 * @param req - Express request object.
 * @param res - Express response object.
 */
export const getTopGainersLosers = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await fetchTopGainersLosers();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error fetching top gainers and losers' });
  }
};

/**
 * Fetches insider transactions data for a specified equity.
 * @param req - Express request object with query parameters.
 * @param res - Express response object.
 */
export const getInsiderTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { symbol } = req.query;

    if (!symbol) {
      res.status(400).json({ error: 'Symbol is required.' });
      return;
    }

    const data = await fetchInsiderTransactions(symbol as string);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error fetching insider transactions' });
  }
};

/**
 * Fetches fixed-window analytics data for specified symbols.
 * @param req - Express request object with query parameters.
 * @param res - Express response object.
 */
export const getAnalyticsFixedWindow = async (req: Request, res: Response): Promise<void> => {
  try {
    const { symbols, range, interval, calculations } = req.query;

    if (!symbols || !range || !interval || !calculations) {
      res.status(400).json({ error: 'Symbols, range, interval, and calculations are required.' });
      return;
    }

    const data = await fetchAnalyticsFixedWindow({
      symbols: symbols as string,
      range: range as string,
      interval: interval as string,
      calculations: calculations as string
    });

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error fetching analytics' });
  }
};

/**
 * Fetches listing status data for equities.
 * @param req - Express request object with query parameters.
 * @param res - Express response object.
 */
export const getListingStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { date, state } = req.query;

    const data = await fetchListingStatus({
      date: date as string | undefined,
      state: state as 'active' | 'delisted' | undefined
    });

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error fetching listing status' });
  }
};