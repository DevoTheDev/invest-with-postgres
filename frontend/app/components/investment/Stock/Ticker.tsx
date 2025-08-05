"use client";
import { Stock } from '@/app/types/Investor';
import React from 'react'
import Movement from '../Movement';

interface TickerProps {
  stock: Partial<Stock>,
  searchTerm?: string;
  searchField?: keyof Stock;
  onClick?: (props?: any) => void;
}

const Ticker = (props: TickerProps): React.ReactNode => {

  const { stock, searchTerm, searchField, onClick } = props;

  const highlightMatch = (text: string, query: string): React.ReactNode => {
    if (!query.trim()) return text;

    try {
      const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      const parts = text.split(regex);
      return parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-yellow-200 text-gray-900 rounded-sm transition-colors duration-200 ease-in-out"
          >
            {part}
          </mark>
        ) : part
      );
    } catch (e) {
      return text;
    }
  };

  const renderValue = (value: unknown, isHighlighted: boolean, searchTerm?: string): React.ReactNode => {
    if (value === undefined || value === null) return 'N/A';
    const text = typeof value === 'string' ? value : value.toString();
    return isHighlighted && searchTerm ? highlightMatch(text, searchTerm) : text;
  };

  return (
    <div>
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col items-left gap-2">
          <div className='flex gap-3' >
            <h2 className="text-xl font-bold text-black/80">
              {renderValue(stock.ticker, searchField === 'ticker', searchTerm)}
            </h2>
          </div>
          <h3 className="text-lg font-medium text-black/60 ">
            {renderValue(stock.name, searchField === 'name', searchTerm)}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold text-green-600">
            ${renderValue(stock.sharePrice, searchField === 'sharePrice', searchTerm)}
          </p>
          <p className="text-sm text-black/60 ">Current Price</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-sm text-black/40">Sector</p>
          <p className="text-base font-medium text-black/70">
            {renderValue(stock.sector, searchField === 'sector', searchTerm)}
          </p>
        </div>
        <div>
          <p className="text-sm text-black/40">Market Cap</p>
          <p className="text-base font-medium text-black/70">
            ${renderValue(
              stock.marketCap ? stock.marketCap / 1e9 : 0,
              searchField === 'marketCap',
              searchTerm
            )}B
          </p>
        </div>
      <div className='flex'>
        {stock.movement && (
          <div className='w-full' >
            <Movement mini movement={stock.movement} />
          </div>
        )}
      </div>
      </div>
    </div>
  )
}


export default Ticker