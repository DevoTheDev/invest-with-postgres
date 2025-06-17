"use client";
import React, { useContext, useState } from "react";
import TopGainersAndLosers from "./TopGainersAndLosers";
import { defaultTickers } from "@/app/defaults/polygonIo-defaults/defaultTickers";
import { useProfile } from "@/app/hooks/useProfile";
import TickerSearch from "./TickerSearch";

const OpenMarket = () => {
  const [error, setError] = useState<string | null>(null);
  const { profile } = useProfile();

  return (
    <div className=" gap-2">
      <TopGainersAndLosers />
      <div className="" >
        <TickerSearch tickers={defaultTickers.results} />
      </div>
    </div>
  );
};

export default OpenMarket;
