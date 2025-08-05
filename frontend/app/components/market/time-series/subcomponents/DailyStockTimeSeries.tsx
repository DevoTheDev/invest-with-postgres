import { DailyTimeSeriesResponse, DailyMetaData, DailyTimeSeries, DailyOHLCV, defaultDailyResponse } from '@/app/defaults/alphaVantage-defaults/defaultDailyDataWithSymbol';
import React, { useState } from 'react';
import Pagination from '../../../sections/Pagination';

interface DailyStockTimeSeriesProps {
  data?: DailyTimeSeriesResponse;
}

const formatCurrency = (value: string) => {
  return parseFloat(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
};

const formatVolume = (value: string) => {
  return parseInt(value).toLocaleString();
};

const DailyStockTimeSeries: React.FC<DailyStockTimeSeriesProps> = ({ data = defaultDailyResponse }) => {
  const metaData: DailyMetaData = data['Meta Data'];
  const timeSeries: DailyTimeSeries = data['Time Series (Daily)'];

  // Convert time series object to array and sort by date (most recent first)
  const sortedDays = Object.entries(timeSeries).sort(([dateA], [dateB]) =>
    new Date(dateB).getTime() - new Date(dateA).getTime()
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of rows per page
  const totalItems = sortedDays.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the slice of data for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sortedDays.slice(startIndex, endIndex);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {metaData['2. Symbol']} Daily Stock Data
      </h2>
      <div className="mb-4 space-y-2">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Information:</span> {metaData['1. Information']}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Last Refreshed:</span>{' '}
          {new Date(metaData['3. Last Refreshed']).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Output Size:</span> {metaData['4. Output Size']}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Time Zone:</span> {metaData['5. Time Zone']}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3">Date</th>
              <th scope="col" className="px-4 py-3">Open</th>
              <th scope="col" className="px-4 py-3">High</th>
              <th scope="col" className="px-4 py-3">Low</th>
              <th scope="col" className="px-4 py-3">Close</th>
              <th scope="col" className="px-4 py-3">Volume</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map(([date, ohlcv]: [string, DailyOHLCV]) => (
              <tr key={date} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{new Date(date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{formatCurrency(ohlcv['1. open'])}</td>
                <td className="px-4 py-2">{formatCurrency(ohlcv['2. high'])}</td>
                <td className="px-4 py-2">{formatCurrency(ohlcv['3. low'])}</td>
                <td className="px-4 py-2">{formatCurrency(ohlcv['4. close'])}</td>
                <td className="px-4 py-2">{formatVolume(ohlcv['5. volume'])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default DailyStockTimeSeries;