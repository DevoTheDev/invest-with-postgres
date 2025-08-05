"use client";
import React, { useState } from 'react';
import { Stock as StockType } from '@/app/types/Investor';
import Stock from './Stock';
import { formatHeader } from '@/app/utils/stringUtils';
import { useRouter } from 'next/navigation';
import { useInvestor } from '@/app/hooks/useInvestor';

interface StockListProps {
  stocks: Partial<StockType>[];
  hideSearch?: boolean
  itemOnClick?: (props: any) => void;
}

type PrimaryDetails = Pick<StockType, "ticker" | "name" | "sharePrice" | "marketCap" | "sector" | "movement">

const StockList: React.FC<StockListProps> = ({ stocks, hideSearch, itemOnClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState<keyof PrimaryDetails>('ticker');
  const router = useRouter();
  const { selection } = useInvestor();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchField(e.target.value as keyof PrimaryDetails);
    setSearchTerm('');
  };

  const filteredStocks = stocks.filter((stock) => {
    if (!searchTerm.trim()) return true;
    const value = stock[searchField];

    if (!value) return false;

    if (searchField === 'movement') {
      const movement = value as { [key: string]: string | any };
      return Object.values(movement).some((num) =>
        (typeof num === 'string' ? num : JSON.stringify(num))
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
      ? value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      : false;
  });

  return (
    <div className="p-4 h-max w-full">
      {hideSearch ? null :<div className="mb-6 flex gap-4">
        <select
          className="border rounded-lg p-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={searchField}
          onChange={handleFieldChange}
        >
          {Object.keys(stocks[0] || {}).map((key) => {
            return (
              <option key={key} value={key}>
                {formatHeader(key)}
              </option>
            )
          })}
        </select>
        <input
          type="text"
          placeholder={`Search by ${searchField.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
          value={searchTerm}
          onChange={handleSearch}
          className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>}
      <div className={`
      grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8
      `}>
        {filteredStocks.map((stock, index) => {

          const selectStock = () => {
            itemOnClick && itemOnClick(stock);
          }

          return (
            <Stock
              key={index}
              stock={stock}
              searchField={searchField}
              searchTerm={searchTerm}
              onClick={selectStock}
            />
          )
        })}
      </div>
    </div>

  );
};

export default StockList;