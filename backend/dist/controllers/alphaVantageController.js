"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListingStatus = exports.getAnalyticsFixedWindow = exports.getInsiderTransactions = exports.getTopGainersLosers = exports.getNewsSentiment = exports.getHistoricalOptions = exports.getMarketStatus = exports.searchForSymbols = exports.getQuote = exports.getMonthlyData = exports.getWeeklyData = exports.getDailyData = exports.getIntradayData = void 0;
const AlphaVantage_1 = require("../services/AlphaVantage");
/**
 * Fetches intraday time series data for a specified equity.
 * @param req - Express request object with query parameters.
 * @param res - Express response object.
 */
const getIntradayData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { symbol, interval, outputsize, adjusted, extended_hours, month, datatype } = req.query;
        if (!symbol || !interval) {
            res.status(400).json({ error: 'Symbol and interval are required.' });
            return;
        }
        const data = yield (0, AlphaVantage_1.fetchIntradayData)({
            symbol: symbol,
            interval: interval,
            outputsize: outputsize,
            adjusted: adjusted ? adjusted === 'true' : undefined,
            extended_hours: extended_hours ? extended_hours === 'true' : undefined,
            month: month,
            datatype: datatype
        });
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Error fetching intraday data' });
    }
});
exports.getIntradayData = getIntradayData;
/**
 * Fetches daily time series data for a specified equity.
 * @param req - Express request object with query parameters.
 * @param res - Express response object.
 */
const getDailyData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { symbol, outputsize, datatype } = req.query;
        if (!symbol) {
            res.status(400).json({ error: 'Symbol is required.' });
            return;
        }
        const data = yield (0, AlphaVantage_1.fetchDailyData)({
            symbol: symbol,
            outputsize: outputsize,
            datatype: datatype
        });
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Error fetching daily data' });
    }
});
exports.getDailyData = getDailyData;
/**
 * Fetches weekly time series data for a specified equity.
 * @param req - Express request object with query parameters.
 * @param res - Express response object.
 */
const getWeeklyData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { symbol, datatype } = req.query;
        if (!symbol) {
            res.status(400).json({ error: 'Symbol is required.' });
            return;
        }
        const data = yield (0, AlphaVantage_1.fetchWeeklyData)({
            symbol: symbol,
            datatype: datatype
        });
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Error fetching weekly data' });
    }
});
exports.getWeeklyData = getWeeklyData;
/**
 * Fetches monthly time series data for a specified equity.
 * @param req - Express request object with query parameters.
 * @param res - Express response object.
 */
const getMonthlyData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { symbol, datatype } = req.query;
        if (!symbol) {
            res.status(400).json({ error: 'Symbol is required.' });
            return;
        }
        const data = yield (0, AlphaVantage_1.fetchMonthlyData)({
            symbol: symbol,
            datatype: datatype
        });
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Error fetching monthly data' });
    }
});
exports.getMonthlyData = getMonthlyData;
/**
 * Fetches global quote data for a specified equity.
 * @param req - Express request object with query parameters.
 * @param res - Express response object.
 */
const getQuote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { symbol, datatype } = req.query;
        if (!symbol) {
            res.status(400).json({ error: 'Symbol is required.' });
            return;
        }
        const data = yield (0, AlphaVantage_1.fetchQuote)({
            symbol: symbol,
            datatype: datatype
        });
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Error fetching quote data' });
    }
});
exports.getQuote = getQuote;
/**
 * Searches for symbols based on keywords.
 * @param req - Express request object with query parameters.
 * @param res - Express response object.
 */
const searchForSymbols = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { keywords, datatype } = req.query;
        if (!keywords) {
            res.status(400).json({ error: 'Keywords are required.' });
            return;
        }
        const data = yield (0, AlphaVantage_1.searchSymbols)({
            keywords: keywords,
            datatype: datatype
        });
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Error searching symbols' });
    }
});
exports.searchForSymbols = searchForSymbols;
/**
 * Fetches current market status.
 * @param req - Express request object.
 * @param res - Express response object.
 */
const getMarketStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, AlphaVantage_1.fetchMarketStatus)();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Error fetching market status' });
    }
});
exports.getMarketStatus = getMarketStatus;
/**
 * Fetches historical options data for a specified equity.
 * @param req - Express request object with query parameters.
 * @param res - Express response object.
 */
const getHistoricalOptions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { symbol, date, datatype } = req.query;
        if (!symbol) {
            res.status(400).json({ error: 'Symbol is required.' });
            return;
        }
        const data = yield (0, AlphaVantage_1.fetchHistoricalOptions)({
            symbol: symbol,
            date: date,
            datatype: datatype
        });
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Error fetching historical options' });
    }
});
exports.getHistoricalOptions = getHistoricalOptions;
/**
 * Fetches news sentiment data for specified tickers or topics.
 * @param req - Express request object with query parameters.
 * @param res - Express response object.
 */
const getNewsSentiment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tickers, topics, timeFrom, timeTo, sort, limit } = req.query;
        const limitNum = limit ? parseInt(limit) : undefined;
        if ((limit && limitNum) && (isNaN(limitNum) || limitNum < 1 || limitNum > 1000)) {
            res.status(400).json({ error: 'Limit must be a number between 1 and 1000.' });
            return;
        }
        const data = yield (0, AlphaVantage_1.fetchNewsSentiment)({
            tickers: tickers,
            topics: topics,
            timeFrom: timeFrom,
            timeTo: timeTo,
            sort: sort,
            limit: limitNum
        });
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Error fetching news sentiment' });
    }
});
exports.getNewsSentiment = getNewsSentiment;
/**
 * Fetches top gainers and losers data.
 * @param req - Express request object.
 * @param res - Express response object.
 */
const getTopGainersLosers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, AlphaVantage_1.fetchTopGainersLosers)();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Error fetching top gainers and losers' });
    }
});
exports.getTopGainersLosers = getTopGainersLosers;
/**
 * Fetches insider transactions data for a specified equity.
 * @param req - Express request object with query parameters.
 * @param res - Express response object.
 */
const getInsiderTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { symbol } = req.query;
        if (!symbol) {
            res.status(400).json({ error: 'Symbol is required.' });
            return;
        }
        const data = yield (0, AlphaVantage_1.fetchInsiderTransactions)(symbol);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Error fetching insider transactions' });
    }
});
exports.getInsiderTransactions = getInsiderTransactions;
/**
 * Fetches fixed-window analytics data for specified symbols.
 * @param req - Express request object with query parameters.
 * @param res - Express response object.
 */
const getAnalyticsFixedWindow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { symbols, range, interval, calculations } = req.query;
        if (!symbols || !range || !interval || !calculations) {
            res.status(400).json({ error: 'Symbols, range, interval, and calculations are required.' });
            return;
        }
        const data = yield (0, AlphaVantage_1.fetchAnalyticsFixedWindow)({
            symbols: symbols,
            range: range,
            interval: interval,
            calculations: calculations
        });
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Error fetching analytics' });
    }
});
exports.getAnalyticsFixedWindow = getAnalyticsFixedWindow;
/**
 * Fetches listing status data for equities.
 * @param req - Express request object with query parameters.
 * @param res - Express response object.
 */
const getListingStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, state } = req.query;
        const data = yield (0, AlphaVantage_1.fetchListingStatus)({
            date: date,
            state: state
        });
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Error fetching listing status' });
    }
});
exports.getListingStatus = getListingStatus;
