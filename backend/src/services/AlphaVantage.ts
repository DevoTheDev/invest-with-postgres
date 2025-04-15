// src/services/alphaVantage.ts
import axios from "axios";
import csv from 'csvtojson';

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

export async function fetchIntradayData(symbol: string, interval: string, outputsize = 'compact') {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&outputsize=${outputsize}&apikey=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
}

export async function fetchDailyData(symbol: string, outputsize = 'compact') {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=${outputsize}&apikey=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
}

export async function fetchWeeklyData(symbol: string, datatype = 'json') {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&datatype=${datatype}&apikey=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
}

export async function fetchMonthlyData(symbol: string, datatype = 'json') {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&datatype=${datatype}&apikey=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
}
export async function fetchQuote(symbol: string, datatype = 'json') {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&datatype=${datatype}&apikey=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
}

export async function searchSymbols(keywords: string, datatype = 'json') {
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&datatype=${datatype}&apikey=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
}

export async function fetchMarketStatus() {
    const url = `https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  }
  
  export async function fetchHistoricalOptions(symbol: string, date: string | null = null, datatype: string = 'json') {
    const url = `https://www.alphavantage.co/query?function=HISTORICAL_OPTIONS&symbol=${symbol}&date=${date || ''}&datatype=${datatype}&apikey=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  }
  
  export async function fetchNewsSentiment(tickers: string | null = '', topics: string | null = '', timeFrom: string | null = '', timeTo: string | null = '', sort: string = 'LATEST', limit: number = 50) {
    const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${tickers}&topics=${topics}&time_from=${timeFrom}&time_to=${timeTo}&sort=${sort}&limit=${limit}&apikey=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  }
  
  export async function fetchTopGainersLosers() {
    const url = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  }
  
  export async function fetchInsiderTransactions(symbol: string) {
    const url = `https://www.alphavantage.co/query?function=INSIDER_TRANSACTIONS&symbol=${symbol}&apikey=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  }
  
  export async function fetchAnalyticsFixedWindow(symbols: string, range: string, interval: string, calculations: string) {
    const url = `https://www.alphavantage.co/query?function=ANALYTICS_FIXED_WINDOW&symbols=${symbols}&range=${range}&interval=${interval}&calculations=${calculations}&apikey=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  }

  export async function fetchListingStatus(
    date: string | null = null,
    state: 'active' | 'delisted' = 'active'
  ) {
    const url = `https://www.alphavantage.co/query?function=LISTING_STATUS${
      date ? `&date=${date}` : ''
    }&state=${state}&apikey=${API_KEY}`;
  
    const response = await axios.get(url); // Still returns CSV
    const json = await csv().fromString(response.data); // Convert to JSON array
  
    return json;
  }