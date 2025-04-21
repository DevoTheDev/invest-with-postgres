"use client";
import React from "react";
import { capitalize, formatHeader } from "@/app/utils/stringUtils";
import { useMarket } from "@/app/hooks/useMarket";
import { Stock } from "@/app/contexts/MarketContext";
import { HideOptions } from "@/app/types/UtilityTypes";

type Props = {
  stock: Stock;
} & HideOptions<Stock>;

const StockLabel = ({ stock, ...targeted }: Props) => {
  const { select } = useMarket();

  const handleClick = () => {
    select(stock);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gray-900 border border-gray-800 rounded-md p-4 cursor-pointer transition-all hover:border-blue-500 hover:bg-gray-700 hover:ring-2 hover:ring-blue-500"
    >
      <div className="text-lg font-medium text-gray-300 mb-3">{stock.name}</div>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(stock).map(([key, value], i) => {
          // Check if the key is visible based on the HideOptions prop
          const hideKey = `hide${capitalize(key)}` as keyof typeof targeted;

          // If the key is visible (i.e., the corresponding hideKey is false), render it
          if (!targeted[hideKey]) {
            return (
              <div key={i} className="flex justify-between items-center text-sm text-gray-500">
                <div className="font-normal">{formatHeader(key)}</div>
                <div className="font-semibold text-green-400">{String(value)}</div>
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default StockLabel;
