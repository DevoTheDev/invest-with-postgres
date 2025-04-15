// src/routes/alphaVantageRoutes.ts
import { Router } from 'express';
import { getWeeklyData, getMonthlyData, getQuote, searchForSymbols, getAnalyticsFixedWindow, getHistoricalOptions, getInsiderTransactions, getMarketStatus, getNewsSentiment, getTopGainersLosers, getListingStatus } from '../controllers/alphaVantageController';

const router = Router();

router.get('/weekly', getWeeklyData);
router.get('/monthly', getMonthlyData);
router.get('/quote', getQuote);
router.get('/search', searchForSymbols);
router.get('/market-status', getMarketStatus);
router.get('/historical-options', getHistoricalOptions);
router.get('/news-sentiment', getNewsSentiment);
router.get('/top-gainers-losers', getTopGainersLosers);
router.get('/insider-transactions', getInsiderTransactions);
router.get('/analytics-fixed-window', getAnalyticsFixedWindow);
router.get('/listing-status', getListingStatus)

export default router;
