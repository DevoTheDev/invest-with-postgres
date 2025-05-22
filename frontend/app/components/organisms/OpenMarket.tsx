"use client";
import React, { useContext, useState } from "react";
import TopGainersAndLosers from "./TopGainersAndLosers";
import { stocks } from "@/app/defaults/companies/top200";
import { useUser } from "@/app/hooks/useProfile";
import StockLabel from "../atoms/StockLabel";
import formatStockMovements from "@/app/utils/marketUtils";

const OpenMarket = () => {
  const [error, setError] = useState<string | null>(null);
  const { profile } = useUser();

  return (
    <div className=" gap-2">
      <TopGainersAndLosers />
      <div className="m-2 grid grid-cols-1 gap-2" >
        {formatStockMovements(stocks).map((stock, i) => {
          return (
            <StockLabel
              key={i}
              stock={stock}
              hideShareCount
              hideMarketCap
              hideMovement
            />
          )
        })}
      </div>
    </div>
  );
};

export default OpenMarket;
