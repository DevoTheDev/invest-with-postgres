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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchIntradayData = fetchIntradayData;
exports.fetchDailyData = fetchDailyData;
exports.fetchWeeklyData = fetchWeeklyData;
exports.fetchMonthlyData = fetchMonthlyData;
exports.fetchQuote = fetchQuote;
exports.searchSymbols = searchSymbols;
exports.fetchMarketStatus = fetchMarketStatus;
exports.fetchHistoricalOptions = fetchHistoricalOptions;
exports.fetchNewsSentiment = fetchNewsSentiment;
exports.fetchTopGainersLosers = fetchTopGainersLosers;
exports.fetchInsiderTransactions = fetchInsiderTransactions;
exports.fetchAnalyticsFixedWindow = fetchAnalyticsFixedWindow;
exports.fetchListingStatus = fetchListingStatus;
const axios_1 = __importDefault(require("axios"));
const csvtojson_1 = __importDefault(require("csvtojson"));
const GetSecret_1 = require("../utils/GetSecret");
const logger_1 = require("../utils/logger");
/**
 * Fetches intraday time series data for a specified equity using Alpha Vantage API.
 * @param params - Parameters for the intraday data request.
 * @returns The API response data (JSON or CSV based on datatype).
 * @throws Error if required parameters are missing or invalid.
 */
function fetchIntradayData(_a) {
    return __awaiter(this, arguments, void 0, function* ({ symbol, interval, outputsize = 'compact', adjusted = true, extended_hours = true, month, datatype = 'json' }) {
        if (!symbol || !interval) {
            throw new Error('Symbol and interval are required parameters.');
        }
        if (!['1min', '5min', '15min', '30min', '60min'].includes(interval)) {
            throw new Error('Invalid interval. Supported values: 1min, 5min, 15min, 30min, 60min.');
        }
        if (month && !/^\d{4}-\d{2}$/.test(month)) {
            throw new Error('Month must be in YYYY-MM format (e.g., 2009-01).');
        }
        if (datatype && !['json', 'csv'].includes(datatype)) {
            throw new Error('Invalid datatype. Supported values: json, csv.');
        }
        const API_KEY = yield (0, GetSecret_1.getSecret)('alpha_vantage_key');
        const params = new URLSearchParams({
            function: 'TIME_SERIES_INTRADAY',
            symbol,
            interval,
            outputsize,
            adjusted: adjusted.toString(),
            extended_hours: extended_hours.toString(),
            apikey: API_KEY
        });
        if (month) {
            params.append('month', month);
        }
        if (datatype) {
            params.append('datatype', datatype);
        }
        const url = `https://www.alphavantage.co/query?${params.toString()}`;
        (0, logger_1.logMessage)('info', `Fetching intraday data for ${symbol} with interval ${interval}`);
        const response = yield axios_1.default.get(url);
        return response.data;
    });
}
/**
 * Fetches daily time series data for a specified equity using Alpha Vantage API.
 * @param params - Parameters for the daily data request.
 * @returns The API response data (JSON or CSV based on datatype).
 * @throws Error if required parameters are missing or invalid.
 */
function fetchDailyData(_a) {
    return __awaiter(this, arguments, void 0, function* ({ symbol, outputsize = 'compact', datatype = 'json' }) {
        if (!symbol) {
            throw new Error('Symbol is a required parameter.');
        }
        if (datatype && !['json', 'csv'].includes(datatype)) {
            throw new Error('Invalid datatype. Supported values: json, csv.');
        }
        const API_KEY = yield (0, GetSecret_1.getSecret)('alpha_vantage_key');
        const params = new URLSearchParams({
            function: 'TIME_SERIES_DAILY',
            symbol,
            outputsize,
            apikey: API_KEY
        });
        if (datatype) {
            params.append('datatype', datatype);
        }
        const url = `https://www.alphavantage.co/query?${params.toString()}`;
        (0, logger_1.logMessage)('info', `Fetching daily data for ${symbol}`);
        const response = yield axios_1.default.get(url);
        return response.data;
    });
}
/**
 * Fetches weekly time series data for a specified equity using Alpha Vantage API.
 * @param params - Parameters for the weekly data request.
 * @returns The API response data (JSON or CSV based on datatype).
 * @throws Error if required parameters are missing or invalid.
 */
function fetchWeeklyData(_a) {
    return __awaiter(this, arguments, void 0, function* ({ symbol, datatype = 'json' }) {
        if (!symbol) {
            throw new Error('Symbol is a required parameter.');
        }
        if (datatype && !['json', 'csv'].includes(datatype)) {
            throw new Error('Invalid datatype. Supported values: json, csv.');
        }
        const API_KEY = yield (0, GetSecret_1.getSecret)('alpha_vantage_key');
        const params = new URLSearchParams({
            function: 'TIME_SERIES_WEEKLY',
            symbol,
            apikey: API_KEY
        });
        if (datatype) {
            params.append('datatype', datatype);
        }
        const url = `https://www.alphavantage.co/query?${params.toString()}`;
        (0, logger_1.logMessage)('info', `Fetching weekly data for ${symbol}`);
        const response = yield axios_1.default.get(url);
        return response.data;
    });
}
/**
 * Fetches monthly time series data for a specified equity using Alpha Vantage API.
 * @param params - Parameters for the monthly data request.
 * @returns The API response data (JSON or CSV based on datatype).
 * @throws Error if required parameters are missing or invalid.
 */
function fetchMonthlyData(_a) {
    return __awaiter(this, arguments, void 0, function* ({ symbol, datatype = 'json' }) {
        if (!symbol) {
            throw new Error('Symbol is a required parameter.');
        }
        if (datatype && !['json', 'csv'].includes(datatype)) {
            throw new Error('Invalid datatype. Supported values: json, csv.');
        }
        const API_KEY = yield (0, GetSecret_1.getSecret)('alpha_vantage_key');
        const params = new URLSearchParams({
            function: 'TIME_SERIES_MONTHLY',
            symbol,
            apikey: API_KEY
        });
        if (datatype) {
            params.append('datatype', datatype);
        }
        const url = `https://www.alphavantage.co/query?${params.toString()}`;
        (0, logger_1.logMessage)('info', `Fetching monthly data for ${symbol}`);
        const response = yield axios_1.default.get(url);
        return response.data;
    });
}
/**
 * Fetches global quote data for a specified equity using Alpha Vantage API.
 * @param params - Parameters for the quote request.
 * @returns The API response data (JSON or CSV based on datatype).
 * @throws Error if required parameters are missing or invalid.
 */
function fetchQuote(_a) {
    return __awaiter(this, arguments, void 0, function* ({ symbol, datatype = 'json' }) {
        if (!symbol) {
            throw new Error('Symbol is a required parameter.');
        }
        if (datatype && !['json', 'csv'].includes(datatype)) {
            throw new Error('Invalid datatype. Supported values: json, csv.');
        }
        const API_KEY = yield (0, GetSecret_1.getSecret)('alpha_vantage_key');
        const params = new URLSearchParams({
            function: 'GLOBAL_QUOTE',
            symbol,
            apikey: API_KEY
        });
        if (datatype) {
            params.append('datatype', datatype);
        }
        const url = `https://www.alphavantage.co/query?${params.toString()}`;
        (0, logger_1.logMessage)('info', `Fetching quote data for ${symbol}`);
        const response = yield axios_1.default.get(url);
        return response.data;
    });
}
/**
 * Searches for symbols based on keywords using Alpha Vantage API.
 * @param params - Parameters for the symbol search request.
 * @returns The API response data (JSON or CSV based on datatype).
 * @throws Error if required parameters are missing.
 */
function searchSymbols(_a) {
    return __awaiter(this, arguments, void 0, function* ({ keywords, datatype = 'json' }) {
        if (!keywords) {
            throw new Error('Keywords is a required parameter.');
        }
        if (datatype && !['json', 'csv'].includes(datatype)) {
            throw new Error('Invalid datatype. Supported values: json, csv.');
        }
        const API_KEY = yield (0, GetSecret_1.getSecret)('alpha_vantage_key');
        const params = new URLSearchParams({
            function: 'SYMBOL_SEARCH',
            keywords,
            apikey: API_KEY
        });
        if (datatype) {
            params.append('datatype', datatype);
        }
        const url = `https://www.alphavantage.co/query?${params.toString()}`;
        (0, logger_1.logMessage)('info', `Searching symbols with keywords: ${keywords}`);
        const response = yield axios_1.default.get(url);
        return response.data;
    });
}
/**
 * Fetches current market status using Alpha Vantage API.
 * @returns The API response data (JSON).
 * @throws Error if the request fails.
 */
function fetchMarketStatus() {
    return __awaiter(this, void 0, void 0, function* () {
        const API_KEY = yield (0, GetSecret_1.getSecret)('alpha_vantage_key');
        const params = new URLSearchParams({
            function: 'MARKET_STATUS',
            apikey: API_KEY
        });
        const url = `https://www.alphavantage.co/query?${params.toString()}`;
        (0, logger_1.logMessage)('info', 'Fetching market status');
        const response = yield axios_1.default.get(url);
        return response.data;
    });
}
/**
 * Fetches historical options data for a specified equity using Alpha Vantage API.
 * @param params - Parameters for the historical options request.
 * @returns The API response data (JSON or CSV based on datatype).
 * @throws Error if required parameters are missing or invalid.
 */
function fetchHistoricalOptions(_a) {
    return __awaiter(this, arguments, void 0, function* ({ symbol, date, datatype = 'json' }) {
        if (!symbol) {
            throw new Error('Symbol is a required parameter.');
        }
        if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            throw new Error('Date must be in YYYY-MM-DD format (e.g., 2023-01-01).');
        }
        if (datatype && !['json', 'csv'].includes(datatype)) {
            throw new Error('Invalid datatype. Supported values: json, csv.');
        }
        const API_KEY = yield (0, GetSecret_1.getSecret)('alpha_vantage_key');
        const params = new URLSearchParams({
            function: 'HISTORICAL_OPTIONS',
            symbol,
            apikey: API_KEY
        });
        if (date) {
            params.append('date', date);
        }
        if (datatype) {
            params.append('datatype', datatype);
        }
        const url = `https://www.alphavantage.co/query?${params.toString()}`;
        (0, logger_1.logMessage)('info', `Fetching historical options for ${symbol}`);
        const response = yield axios_1.default.get(url);
        return response.data;
    });
}
/**
 * Fetches news sentiment data for specified tickers or topics using Alpha Vantage API.
 * @param params - Parameters for the news sentiment request.
 * @returns The API response data (JSON).
 * @throws Error if parameters are invalid.
 */
function fetchNewsSentiment(_a) {
    return __awaiter(this, arguments, void 0, function* ({ tickers, topics, timeFrom, timeTo, sort = 'LATEST', limit = 50 }) {
        if (timeFrom && !/^\d{8}T\d{4}$/.test(timeFrom)) {
            throw new Error('timeFrom must be in YYYYMMDDTHHMM format (e.g., 20230101T0000).');
        }
        if (timeTo && !/^\d{8}T\d{4}$/.test(timeTo)) {
            throw new Error('timeTo must be in YYYYMMDDTHHMM format (e.g., 20230101T0000).');
        }
        if (!['LATEST', 'EARLIEST', 'RELEVANCE'].includes(sort)) {
            throw new Error('Invalid sort. Supported values: LATEST, EARLIEST, RELEVANCE.');
        }
        if (limit < 1 || limit > 1000) {
            throw new Error('Limit must be between 1 and 1000.');
        }
        const API_KEY = yield (0, GetSecret_1.getSecret)('alpha_vantage_key');
        const params = new URLSearchParams({
            function: 'NEWS_SENTIMENT',
            apikey: API_KEY
        });
        if (tickers) {
            params.append('tickers', tickers);
        }
        if (topics) {
            params.append('topics', topics);
        }
        if (timeFrom) {
            params.append('time_from', timeFrom);
        }
        if (timeTo) {
            params.append('time_to', timeTo);
        }
        params.append('sort', sort);
        params.append('limit', limit.toString());
        const url = `https://www.alphavantage.co/query?${params.toString()}`;
        (0, logger_1.logMessage)('info', `Fetching news sentiment for tickers: ${tickers || 'none'}`);
        const response = yield axios_1.default.get(url);
        return response.data;
    });
}
/**
 * Fetches top gainers and losers data using Alpha Vantage API.
 * @returns The API response data (JSON).
 * @throws Error if the request fails.
 */
function fetchTopGainersLosers() {
    return __awaiter(this, void 0, void 0, function* () {
        const API_KEY = yield (0, GetSecret_1.getSecret)('alpha_vantage_key');
        const params = new URLSearchParams({
            function: 'TOP_GAINERS_LOSERS',
            apikey: API_KEY
        });
        const url = `https://www.alphavantage.co/query?${params.toString()}`;
        (0, logger_1.logMessage)('info', 'Fetching top gainers and losers');
        const response = yield axios_1.default.get(url);
        return response.data;
    });
}
/**
 * Fetches insider transactions data for a specified equity using Alpha Vantage API.
 * @param symbol - The equity symbol (e.g., 'IBM').
 * @returns The API response data (JSON).
 * @throws Error if required parameters are missing.
 */
function fetchInsiderTransactions(symbol) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!symbol) {
            throw new Error('Symbol is a required parameter.');
        }
        const API_KEY = yield (0, GetSecret_1.getSecret)('alpha_vantage_key');
        const params = new URLSearchParams({
            function: 'INSIDER_TRANSACTIONS',
            symbol,
            apikey: API_KEY
        });
        const url = `https://www.alphavantage.co/query?${params.toString()}`;
        (0, logger_1.logMessage)('info', `Fetching insider transactions for ${symbol}`);
        const response = yield axios_1.default.get(url);
        return response.data;
    });
}
/**
 * Fetches fixed-window analytics data for specified symbols using Alpha Vantage API.
 * @param params - Parameters for the analytics request.
 * @returns The API response data (JSON).
 * @throws Error if required parameters are missing.
 */
function fetchAnalyticsFixedWindow(_a) {
    return __awaiter(this, arguments, void 0, function* ({ symbols, range, interval, calculations }) {
        if (!symbols || !range || !interval || !calculations) {
            throw new Error('Symbols, range, interval, and calculations are required parameters.');
        }
        const API_KEY = yield (0, GetSecret_1.getSecret)('alpha_vantage_key');
        const params = new URLSearchParams();
        params.set('function', 'ANALYTICS_FIXED_WINDOW');
        params.set('SYMBOLS', symbols); // <-- note uppercase
        params.set('INTERVAL', interval);
        params.set('CALCULATIONS', calculations);
        params.set('apikey', API_KEY);
        // Support multiple RANGE values (start and end)
        if (Array.isArray(range)) {
            range.forEach(r => params.append('RANGE', r));
        }
        else {
            params.append('RANGE', range);
        }
        const url = `https://www.alphavantage.co/query?${params.toString()}`;
        (0, logger_1.logMessage)('info', `Fetching analytics for symbols: ${symbols}`);
        const response = yield axios_1.default.get(url);
        return response.data;
    });
}
/**
 * Fetches listing status data for equities using Alpha Vantage API.
 * @param params - Parameters for the listing status request.
 * @returns Parsed JSON data from the CSV response.
 * @throws Error if parameters are invalid or the request fails.
 */
function fetchListingStatus() {
    return __awaiter(this, arguments, void 0, function* ({ date, state = 'active' } = {}) {
        if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            throw new Error('Date must be in YYYY-MM-DD format (e.g., 2023-01-01).');
        }
        if (!['active', 'delisted'].includes(state)) {
            throw new Error('Invalid state. Supported values: active, delisted.');
        }
        const API_KEY = yield (0, GetSecret_1.getSecret)('alpha_vantage_key');
        const params = new URLSearchParams({
            function: 'LISTING_STATUS',
            state,
            apikey: API_KEY
        });
        if (date) {
            params.append('date', date);
        }
        const url = `https://www.alphavantage.co/query?${params.toString()}`;
        (0, logger_1.logMessage)('info', `Fetching listing status for state: ${state}`);
        const response = yield axios_1.default.get(url);
        const json = yield (0, csvtojson_1.default)().fromString(response.data);
        return json;
    });
}
