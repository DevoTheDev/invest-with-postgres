import { Router } from 'express';
import * as alphaVantageController from '../controllers/alphaVantageController';

const router = Router();

router.get('/intraday', alphaVantageController.getIntradayData);
router.get('/daily', alphaVantageController.getDailyData);
router.get('/weekly', alphaVantageController.getWeeklyData);
router.get('/monthly', alphaVantageController.getMonthlyData);
router.get('/quote', alphaVantageController.getQuote);
router.get('/search', alphaVantageController.searchForSymbols);
router.get('/market-status', alphaVantageController.getMarketStatus);
router.get('/historical-options', alphaVantageController.getHistoricalOptions);
router.get('/news-sentiment', alphaVantageController.getNewsSentiment);
router.get('/top-gainers-losers', alphaVantageController.getTopGainersLosers);
router.get('/insider-transactions', alphaVantageController.getInsiderTransactions);
router.get('/analytics', alphaVantageController.getAnalyticsFixedWindow);
router.get('/listing-status', alphaVantageController.getListingStatus);

export default router;