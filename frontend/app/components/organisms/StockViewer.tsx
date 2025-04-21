"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { useMarket } from '@/app/hooks/useMarket';
import AlphaVantage from '@/app/controllers/alphaVantageController';

interface TimeSeriesEntry {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. volume': string;
}

interface TimeSeriesData {
  'Meta Data': {
    '1. Information': string;
    '2. Symbol': string;
    '3. Last Refreshed': string;
    '4. Time Zone': string;
    [key: string]: string;
  };
  [key: string]: Record<string, TimeSeriesEntry> | { [key: string]: string };
}

const ENTRIES_PER_PAGE = 10;

const StockViewer: React.FC = () => {
  const { selection, intradayData, intradayError, select, deselect } = useMarket();
  const alphaVantage = AlphaVantage();
  const [dataType, setDataType] = useState<'intraday' | 'daily' | 'weekly' | 'monthly'>('intraday');
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data based on selected stock and data type
  useEffect(() => {
    if (selection) {
      const fetchData = async () => {
        try {
          let response;
          setError(null);
          setCurrentPage(1);
          switch (dataType) {
            case 'intraday':
              response = await alphaVantage.IntraDay({
                symbol: selection.ticker,
                interval: '5min',
                outputsize: 'compact'
              });
              break;
            case 'daily':
              response = await alphaVantage.Daily({
                symbol: selection.ticker,
                outputsize: 'compact'
              });
              break;
            case 'weekly':
              response = await alphaVantage.Weekly({
                symbol: selection.ticker
              });
              break;
            case 'monthly':
              response = await alphaVantage.Monthly({
                symbol: selection.ticker
              });
              break;
          }
          console.log(`Raw API Response (${dataType}):`, response); // Debug log
          if (response.error) {
            setError(response.error);
            setTimeSeriesData(null);
          } else if (!response.data) {
            setError('No data received from API');
            setTimeSeriesData(null);
          } else if (response.data['Error Message']) {
            setError(`API Error: ${response.data['Error Message']}`);
            setTimeSeriesData(null);
          } else if (response.data['Note']) {
            setError(`API Notice: ${response.data['Note']}`);
            setTimeSeriesData(null);
          } else if (response.data['Information']) {
            setError(`API Info: ${response.data['Information']}`);
            setTimeSeriesData(null);
          } else if (!response.data['Meta Data'] || !getTimeSeriesKey(response.data)) {
            setError('Invalid data format: Missing Meta Data or time series');
            setTimeSeriesData(null);
          } else {
            setTimeSeriesData(response.data);
          }
        } catch (err: any) {
          console.error('Fetch Error:', err);
          setError(err.message || 'Failed to fetch data');
          setTimeSeriesData(null);
        }
      };
      fetchData();
    }
  }, [selection, dataType]);

  const handleSelectStock = () => {
    select({
      ticker: 'AAPL',
      name: 'Apple Inc.',
      sharePrice: 196.98,
      shareCount: 15000000000,
      movement: {
        intraday: 0,
        daily: 0,
        weekly: 0,
        monthly: 0,
        quarterly: 0
      }
    });
  };

  // Get time series key dynamically
  const getTimeSeriesKey = (data: TimeSeriesData): string | null => {
    const keys = Object.keys(data).filter(key => key !== 'Meta Data');
    return keys.length > 0 ? keys[0] : null;
  };

  // Format timestamp based on data type
  const formatTimestamp = (timestamp: string, dataType: string): string => {
    const date = new Date(timestamp);
    if (dataType === 'intraday') {
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // Middleware: Process and paginate time series data
  const paginatedData = useMemo(() => {
    if (!timeSeriesData) return { entries: [], totalPages: 0 };

    const timeSeriesKey = getTimeSeriesKey(timeSeriesData);
    if (!timeSeriesKey || !timeSeriesData[timeSeriesKey]) return { entries: [], totalPages: 0 };

    // Sort entries by timestamp (descending)
    const entries = Object.entries(timeSeriesData[timeSeriesKey] || {}).sort(
      ([a], [b]) => new Date(b).getTime() - new Date(a).getTime()
    );

    // Calculate pagination
    const totalPages = Math.ceil(entries.length / ENTRIES_PER_PAGE);
    const startIndex = (currentPage - 1) * ENTRIES_PER_PAGE;
    const paginatedEntries = entries.slice(startIndex, startIndex + ENTRIES_PER_PAGE);

    return { entries: paginatedEntries, totalPages };
  }, [timeSeriesData, currentPage]);

  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 font-mono p-4">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg shadow-cyan-500/50 border border-cyan-500 p-6">
        <h1 className="text-3xl font-bold text-cyan-300 mb-4 text-center">Stock Viewer</h1>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button
            onClick={handleSelectStock}
            className="px-4 py-2 bg-cyan-600 text-gray-900 rounded-md hover:bg-cyan-400 transition-colors duration-300"
          >
            Select AAPL
          </button>
          <button
            onClick={deselect}
            className="px-4 py-2 bg-gray-600 text-cyan-300 rounded-md hover:bg-gray-500 transition-colors duration-300"
          >
            Deselect
          </button>
          <div className="flex gap-2">
            {['intraday', 'daily', 'weekly', 'monthly'].map(type => (
              <button
                key={type}
                onClick={() => setDataType(type as any)}
                className={`px-3 py-1 rounded-md text-sm capitalize ${
                  dataType === type
                    ? 'bg-cyan-600 text-gray-900'
                    : 'bg-gray-600 text-cyan-300 hover:bg-gray-500'
                } transition-colors duration-300`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {selection && (
          <div>
            <h2 className="text-2xl font-semibold text-cyan-300 mb-4">
              {selection.name} ({selection.ticker})
            </h2>
            {error && (
              <p className="text-red-400 bg-gray-700 p-3 rounded-md mb-4">
                Error: {error}
              </p>
            )}
            {timeSeriesData ? (
              <div>
                {/* Meta Data (Collapsible) */}
                <details className="mb-4">
                  <summary className="bg-gray-700 rounded-md p-3 text-lg font-medium text-cyan-300 cursor-pointer hover:bg-gray-600 transition-colors duration-200">
                    Meta Data
                  </summary>
                  <div className="bg-gray-700 rounded-b-md p-4 text-sm">
                    {Object.entries(timeSeriesData['Meta Data'] || {}).map(([key, value]) => (
                      <p key={key} className="mb-1">
                        <span className="text-cyan-500">{key.replace(/^\d+\.\s*/, '')}:</span> {value}
                      </p>
                    ))}
                  </div>
                </details>

                {/* Time Series (Collapsible) */}
                <details className="mb-4">
                  <summary className="bg-gray-700 rounded-md p-3 text-lg font-medium text-cyan-300 cursor-pointer hover:bg-gray-600 transition-colors duration-200">
                    {getTimeSeriesKey(timeSeriesData) || 'Time Series'}
                  </summary>
                  <div className="bg-gray-700 rounded-b-md p-4">
                    {paginatedData.entries.length > 0 ? (
                      <>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm text-left text-cyan-400">
                            <thead className="text-xs uppercase bg-gray-700 text-cyan-300">
                              <tr>
                                <th className="px-4 py-2 rounded-tl-md">Timestamp</th>
                                <th className="px-4 py-2">Open</th>
                                <th className="px-4 py-2">High</th>
                                <th className="px-4 py-2">Low</th>
                                <th className="px-4 py-2">Close</th>
                                <th className="px-4 py-2 rounded-tr-md">Volume</th>
                              </tr>
                            </thead>
                            <tbody>
                              {paginatedData.entries.map(([timestamp, data]) => (
                                <tr
                                  key={timestamp}
                                  className="border-b border-gray-600 hover:bg-gray-700 transition-colors duration-200"
                                >
                                  <td className="px-4 py-2">{formatTimestamp(timestamp, dataType)}</td>
                                  <td className="px-4 py-2">{data['1. open']}</td>
                                  <td className="px-4 py-2">{data['2. high']}</td>
                                  <td className="px-4 py-2">{data['3. low']}</td>
                                  <td className="px-4 py-2">{data['4. close']}</td>
                                  <td className="px-4 py-2">{data['5. volume']}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Pagination Controls */}
                        {paginatedData.totalPages > 1 && (
                          <div className="flex flex-wrap justify-center gap-2 mt-4">
                            <button
                              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                              disabled={currentPage === 1}
                              className={`px-3 py-1 rounded-md text-sm ${
                                currentPage === 1
                                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                  : 'bg-gray-600 text-cyan-300 hover:bg-gray-500'
                              } transition-colors duration-300`}
                            >
                              Prev
                            </button>
                            {Array.from({ length: paginatedData.totalPages }, (_, i) => i + 1)
                              .filter(page => {
                                return (
                                  page === 1 ||
                                  page === paginatedData.totalPages ||
                                  Math.abs(page - currentPage) <= 2
                                );
                              })
                              .map(page => (
                                <button
                                  key={page}
                                  onClick={() => setCurrentPage(page)}
                                  className={`px-3 py-1 rounded-md text-sm ${
                                    page === currentPage
                                      ? 'bg-cyan-600 text-gray-900'
                                      : 'bg-gray-600 text-cyan-300 hover:bg-gray-500'
                                  } transition-colors duration-300`}
                                >
                                  {page}
                                </button>
                              ))}
                            <button
                              onClick={() => setCurrentPage(p => Math.min(paginatedData.totalPages, p + 1))}
                              disabled={currentPage === paginatedData.totalPages}
                              className={`px-3 py-1 rounded-md text-sm ${
                                currentPage === paginatedData.totalPages
                                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                  : 'bg-gray-600 text-cyan-300 hover:bg-gray-500'
                              } transition-colors duration-300`}
                            >
                              Next
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-cyan-400 text-sm">No time series data available.</p>
                    )}
                  </div>
                </details>
              </div>
            ) : (
              !error && <p className="text-cyan-400 text-sm">Loading data...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StockViewer;