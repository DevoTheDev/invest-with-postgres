"use client";
import React, { useState } from "react";
import { useInvestor } from "@/app/hooks/useInvestor";

type SharesCounterProps = {
  currentShares?: number;
  currentPrice: number | string;
};

const SharesCounter = ({
  currentShares = 0,
  currentPrice,
}: SharesCounterProps) => {
  const [shares, setShares] = useState(currentShares);
  const { investor } = useInvestor();

  const parsedPrice =
    typeof currentPrice === "string" ? parseFloat(currentPrice) : currentPrice;

  const totalCost = +(shares * parsedPrice).toFixed(2);
  const budget = investor?.annual_investment_budget ?? 0;
  const remaining = +(budget - totalCost).toFixed(2);
  const canAffordMore = remaining >= parsedPrice;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setShares(value);
    }
  };

  const incrementShares = () => {
    if (canAffordMore) setShares((prev) => prev + 1);
  };

  const decrementShares = () => {
    setShares((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="p-6 rounded-2xl bg-white/70 shadow-xl w-full max-w-md space-y-6 border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Shares Desired</h2>
        <p className="text-sm text-gray-600">
          Price: <span className="font-medium">${parsedPrice?.toFixed(2)}</span>
        </p>
      </div>

      {/* Counter */}
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={decrementShares}
          className="text-2xl w-10 h-10 rounded-full bg-gray-800 text-white hover:bg-gray-600"
        >
          −
        </button>

        <input
          type="number"
          value={shares}
          onChange={handleChange}
          min={0}
          className="w-1/3 text-center flex items-center justify-center text-2xl text-black/70 font-semibold border border-gray-300 rounded-lg py-1"
        />

        <button
          onClick={incrementShares}
          disabled={!canAffordMore}
          className={`text-2xl w-10 h-10 rounded-full ${
            canAffordMore
              ? "bg-gray-800 text-white hover:bg-gray-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          +
        </button>
      </div>

      {/* Info Panel */}
      <div className="text-sm text-gray-700 space-y-1 text-center">
        <p>
          Total Cost:{" "}
          <span className="font-semibold">${totalCost.toLocaleString()}</span>
        </p>
        <p>
          Budget:{" "}
          <span className="font-semibold">${budget.toLocaleString()}</span>
        </p>
        <p
          className={`${
            remaining < 0 ? "text-red-600 font-semibold" : "text-green-600"
          }`}
        >
          {remaining < 0
            ? `Over Budget by $${Math.abs(remaining).toFixed(2)}`
            : `Remaining Budget: $${remaining.toFixed(2)}`}
        </p>
      </div>

      {/* Action */}
      <div className="flex justify-center pt-2">
        <button
          disabled={totalCost > budget || shares === 0}
          className={`
            px-6 py-2 rounded-full text-white font-medium transition
            ${
              totalCost > budget || shares === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }
          `}
        >
          Invest ${totalCost}
        </button>
      </div>
    </div>
  );
};

export default SharesCounter;
