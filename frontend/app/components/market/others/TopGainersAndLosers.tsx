import React from 'react';
import { TopGainersAndLosers as TGAL } from '@/app/defaults/alphaVantage-defaults/defaultGainersAndLosers';

interface TopGainersAndLosersProps {
  data: TGAL;
}

const formatCurrency = (value: number | string) => {
  return parseFloat(value.toString()).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
};

const formatPercentage = (value: number | string) => {
  return parseFloat(value.toString()).toFixed(2) + '%';
};

const formatVolume = (value: number | string) => {
  return parseInt(value.toString()).toLocaleString();
};

const TopGainersAndLosers: React.FC<TopGainersAndLosersProps> = ({ data }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Top Gainers and Losers</h2>
      <div className="mb-4 space-y-2">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Metadata:</span> {data.metadata}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Last Updated:</span>{' '}
          {new Date(data.last_updated).toLocaleString()}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Gainers Table */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Top Gainers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3">Ticker</th>
                  <th scope="col" className="px-4 py-3">Price</th>
                  <th scope="col" className="px-4 py-3">Change</th>
                  <th scope="col" className="px-4 py-3">Change %</th>
                  <th scope="col" className="px-4 py-3">Volume</th>
                </tr>
              </thead>
              <tbody>
                {data.top_gainers.map((gainer) => (
                  <tr key={gainer.ticker} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{gainer.ticker}</td>
                    <td className="px-4 py-2">{formatCurrency(gainer.price)}</td>
                    <td className="px-4 py-2 text-green-600">{formatCurrency(gainer.change_amount)}</td>
                    <td className="px-4 py-2 text-green-600">{formatPercentage(gainer.change_percentage)}</td>
                    <td className="px-4 py-2">{formatVolume(gainer.volume)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Top Losers Table */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Top Losers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3">Ticker</th>
                  <th scope="col" className="px-4 py-3">Price</th>
                  <th scope="col" className="px-4 py-3">Change</th>
                  <th scope="col" className="px-4 py-3">Change %</th>
                  <th scope="col" className="px-4 py-3">Volume</th>
                </tr>
              </thead>
              <tbody>
                {data.top_losers.map((loser) => (
                  <tr key={loser.ticker} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{loser.ticker}</td>
                    <td className="px-4 py-2">{formatCurrency(loser.price)}</td>
                    <td className="px-4 py-2 text-red-600">{formatCurrency(loser.change_amount)}</td>
                    <td className="px-4 py-2 text-red-600">{formatPercentage(loser.change_percentage)}</td>
                    <td className="px-4 py-2">{formatVolume(loser.volume)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopGainersAndLosers;