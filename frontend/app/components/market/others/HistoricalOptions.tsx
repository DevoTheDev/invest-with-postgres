import React from 'react';
import { HistoricalOptionsResponse } from '@/app/defaults/alphaVantage-defaults/defaultHistoricalOptions';

interface HistoricalOptionsProps {
  data: HistoricalOptionsResponse;
}

const formatCurrency = (value: string) => {
  return parseFloat(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
};

const formatNumber = (value: string) => {
  return parseFloat(value).toFixed(4);
};

const HistoricalOptions: React.FC<HistoricalOptionsProps> = ({ data }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Historical Options Data</h2>
      <div className="mb-4 space-y-2">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Endpoint:</span> {data.endpoint}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Message:</span> {data.message}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3">Contract ID</th>
              <th scope="col" className="px-4 py-3">Symbol</th>
              <th scope="col" className="px-4 py-3">Expiration</th>
              <th scope="col" className="px-4 py-3">Strike</th>
              <th scope="col" className="px-4 py-3">Type</th>
              <th scope="col" className="px-4 py-3">Last</th>
              <th scope="col" className="px-4 py-3">Mark</th>
              <th scope="col" className="px-4 py-3">Bid</th>
              <th scope="col" className="px-4 py-3">Ask</th>
              <th scope="col" className="px-4 py-3">Volume</th>
              <th scope="col" className="px-4 py-3">Open Interest</th>
              <th scope="col" className="px-4 py-3">Implied Volatility</th>
              <th scope="col" className="px-4 py-3">Delta</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((option) => (
              <tr key={option.contractID} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{option.contractID}</td>
                <td className="px-4 py-2">{option.symbol}</td>
                <td className="px-4 py-2">{new Date(option.expiration).toLocaleDateString()}</td>
                <td className="px-4 py-2">{formatCurrency(option.strike)}</td>
                <td className="px-4 py-2 capitalize">{option.type}</td>
                <td className="px-4 py-2">{formatCurrency(option.last)}</td>
                <td className="px-4 py-2">{formatCurrency(option.mark)}</td>
                <td className="px-4 py-2">{formatCurrency(option.bid)}</td>
                <td className="px-4 py-2">{formatCurrency(option.ask)}</td>
                <td className="px-4 py-2">{parseInt(option.volume).toLocaleString()}</td>
                <td className="px-4 py-2">{parseInt(option.open_interest).toLocaleString()}</td>
                <td className="px-4 py-2">{formatNumber(option.implied_volatility)}</td>
                <td className="px-4 py-2">{formatNumber(option.delta)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoricalOptions;