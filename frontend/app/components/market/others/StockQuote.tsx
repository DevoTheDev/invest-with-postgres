import React from 'react';
import { StockQuoteResponse, GlobalQuote } from '@/app/defaults/alphaVantage-defaults/defaultQuote';

interface StockQuoteDisplayProps {
  data: StockQuoteResponse;
}

const formatCurrency = (value: string) => {
  return parseFloat(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
};

const formatPercentage = (value: string) => {
  return parseFloat(value).toFixed(2) + '%';
};

const StockQuoteDisplay: React.FC<StockQuoteDisplayProps> = ({ data }) => {
  const quote: GlobalQuote = data['Global Quote'];

  // Determine if change is positive or negative for styling
  const isPositive = parseFloat(quote['09. change']) >= 0;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{quote['01. symbol']} Stock Quote</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Latest Price:</span> {formatCurrency(quote['05. price'])}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Open:</span> {formatCurrency(quote['02. open'])}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">High:</span> {formatCurrency(quote['03. high'])}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Low:</span> {formatCurrency(quote['04. low'])}
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Volume:</span> {parseInt(quote['06. volume']).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Previous Close:</span> {formatCurrency(quote['08. previous close'])}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Change:</span>{' '}
            <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
              {formatCurrency(quote['09. change'])}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Change %:</span>{' '}
            <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
              {formatPercentage(quote['10. change percent'])}
            </span>
          </p>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-4">
        Latest Trading Day: {new Date(quote['07. latest trading day']).toLocaleDateString()}
      </p>
    </div>
  );
};

export default StockQuoteDisplay;