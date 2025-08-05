import React from 'react';
import { InsiderTransactionsResponse } from '@/app/defaults/alphaVantage-defaults/defaultInsiderTransactions';

interface InsiderTransactionsProps {
  data: InsiderTransactionsResponse;
}

const formatCurrency = (value: string) => {
  return parseFloat(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
};

const formatShares = (value: string) => {
  return parseInt(value).toLocaleString();
};

const InsiderTransactions: React.FC<InsiderTransactionsProps> = ({ data }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Insider Transactions</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3">Date</th>
              <th scope="col" className="px-4 py-3">Ticker</th>
              <th scope="col" className="px-4 py-3">Executive</th>
              <th scope="col" className="px-4 py-3">Title</th>
              <th scope="col" className="px-4 py-3">Security Type</th>
              <th scope="col" className="px-4 py-3">A/D</th>
              <th scope="col" className="px-4 py-3">Shares</th>
              <th scope="col" className="px-4 py-3">Share Price</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((transaction, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{new Date(transaction.transaction_date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{transaction.ticker}</td>
                <td className="px-4 py-2">{transaction.executive}</td>
                <td className="px-4 py-2">{transaction.executive_title}</td>
                <td className="px-4 py-2">{transaction.security_type}</td>
                <td className="px-4 py-2">
                  <span className={transaction.acquisition_or_disposal === 'A' ? 'text-green-600' : 'text-red-600'}>
                    {transaction.acquisition_or_disposal === 'A' ? 'Acquisition' : 'Disposal'}
                  </span>
                </td>
                <td className="px-4 py-2">{formatShares(transaction.shares)}</td>
                <td className="px-4 py-2">{formatCurrency(transaction.share_price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InsiderTransactions;