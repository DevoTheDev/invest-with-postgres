import { AlphaVantageListing } from '@/app/defaults/alphaVantage-defaults/defaultListingStatus';
import { MarketStatusResponse } from '@/app/defaults/alphaVantage-defaults/defaultMarketStatus';
import React from 'react';
 

interface MarketListingsAndStatusProps {
  listings: AlphaVantageListing[];
  status: MarketStatusResponse;
}

const formatDate = (date: string) => {
  return date === 'null' ? 'N/A' : new Date(date).toLocaleDateString();
};

const MarketListingsAndStatus: React.FC<MarketListingsAndStatusProps> = ({ listings, status }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Market Listings and Status</h2>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Market Status</h3>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-semibold">Endpoint:</span> {status.endpoint}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {status.markets.map((market, index) => (
            <div key={index} className="border rounded p-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Market Type:</span> {market.market_type}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Region:</span> {market.region}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Primary Exchanges:</span> {market.primary_exchanges}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Local Open:</span> {market.local_open}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Local Close:</span> {market.local_close}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Status:</span>{' '}
                <span className={market.current_status === 'open' ? 'text-green-600' : 'text-red-600'}>
                  {market.current_status.charAt(0).toUpperCase() + market.current_status.slice(1)}
                </span>
              </p>
              {market.notes && (
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Notes:</span> {market.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Listings</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3">Symbol</th>
              <th scope="col" className="px-4 py-3">Name</th>
              <th scope="col" className="px-4 py-3">Exchange</th>
              <th scope="col" className="px-4 py-3">Asset Type</th>
              <th scope="col" className="px-4 py-3">IPO Date</th>
              <th scope="col" className="px-4 py-3">Delisting Date</th>
              <th scope="col" className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr key={listing.symbol} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{listing.symbol}</td>
                <td className="px-4 py-2">{listing.name}</td>
                <td className="px-4 py-2">{listing.exchange}</td>
                <td className="px-4 py-2">{listing.assetType}</td>
                <td className="px-4 py-2">{formatDate(listing.ipoDate)}</td>
                <td className="px-4 py-2">{formatDate(listing.delistingDate)}</td>
                <td className="px-4 py-2">{listing.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketListingsAndStatus;