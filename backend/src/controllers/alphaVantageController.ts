// src/controllers/alphaVantageController.ts
import { Request, Response } from 'express';
import { fetchWeeklyData, fetchMonthlyData, fetchQuote, searchSymbols, fetchTopGainersLosers, fetchAnalyticsFixedWindow, fetchHistoricalOptions, fetchInsiderTransactions, fetchMarketStatus, fetchNewsSentiment, fetchListingStatus } from '../services/alphaVantage';

export const getWeeklyData = async (req: Request, res: Response) => {
  try {
    const { symbol, datatype } = req.query;
    const data = await fetchWeeklyData(symbol as string, datatype as string);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weekly data' });
  }
};

export const getMonthlyData = async (req: Request, res: Response) => {
  try {
    const { symbol, datatype } = req.query;
    const data = await fetchMonthlyData(symbol as string, datatype as string);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching monthly data' });
  }
};

export const getQuote = async (req: Request, res: Response) => {
  try {
    const { symbol, datatype } = req.query;
    const data = await fetchQuote(symbol as string, datatype as string);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching quote data' });
  }
};

export const searchForSymbols = async (req: Request, res: Response) => {
  try {
    const { keywords, datatype } = req.query;
    const data = await searchSymbols(keywords as string, datatype as string);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error searching symbols' });
  }
};

export const getMarketStatus = async (req: Request, res: Response) => {
  try {
    const data = await fetchMarketStatus();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching market status' });
  }
};

export const getHistoricalOptions = async (req: Request, res: Response) => {
  try {
    const { symbol, date, datatype } = req.query;
    const data = await fetchHistoricalOptions(symbol as string, date as string, datatype as string);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching historical options' });
  }
};

export const getNewsSentiment = async (req: Request, res: Response) => {
  try {
    const { tickers, topics, timeFrom, timeTo, sort, limit } = req.query;
    const data = await fetchNewsSentiment(
      tickers as string, 
      topics as string, 
      timeFrom as string, 
      timeTo as string, 
      sort as string, 
      parseInt(limit as string)
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching news sentiment' });
  }
};

export const getTopGainersLosers = async (req: Request, res: Response) => {
  try {
    const data = await fetchTopGainersLosers();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching top gainers and losers' });
  }
};

export const getInsiderTransactions = async (req: Request, res: Response) => {
  try {
    const { symbol } = req.query;
    const data = await fetchInsiderTransactions(symbol as string);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching insider transactions' });
  }
};

export const getAnalyticsFixedWindow = async (req: Request, res: Response) => {
  try {
    const { symbols, range, interval, calculations } = req.query;
    const data = await fetchAnalyticsFixedWindow(symbols as string, range as string, interval as string, calculations as string);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching analytics' });
  }
};

export const getListingStatus = async (req: Request, res: Response) => {
  try {
    const { date, state } = req.query;
    const data = await fetchListingStatus(
      date as string | null,
      (state as 'active' | 'delisted') || 'active'
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching listing status' });
  }
};
