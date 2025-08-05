"use client";
import React from "react";
import { Stock } from "@/app/types/Investor";
import Movement from "./Movement";
import { useInvestor } from "@/app/hooks/useInvestor";
import SharesCounter from "./SharesCounter";
import Details from "./Stock/Details";

type Props = {
  stock: Partial<Stock>;
};

const Investment: React.FC<Props> = ({ stock }) => {
  const {
    sharePrice,
    movement,
  } = stock;

  const {
    investor,
    addInvestment,
    updateInvestmentById,
    deleteInvestmentById,
    invested
  } = useInvestor();

  return (
    <div className="w-full p-8 gap-12 text-white rounded-2xl shadow-xl ring-gray-800 flex justify-around">

      {/* Shares Counter */}
      <div className="col-span-1 flex items-center justify-center">
        <Details {...stock} />
      </div>
      {/* Movement Chart */}
      <div className="w-full gap-12 flex items-center justify-center">
          <Movement movement={movement!} />
        <SharesCounter currentShares={0} currentPrice={sharePrice!} />
      </div>
    </div>
  );
};

export default Investment;
