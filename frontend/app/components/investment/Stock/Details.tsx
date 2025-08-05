"use client";
import React from 'react'
import { Stock } from '@/app/types/Investor';

const Details = (stock: Partial<Stock>) => {

  const {
    ticker,
    name,
    market,
    primary_exchange,
    sector,
    type,
    sharePrice,
    marketCap,
    currency_name,
  } = stock;
  

  return (
    <div>
        {/* Company + Stock Info */}
      <div className="col-span-1 space-y-4">
        <div>
          <h2 className="text-2xl text-black/70 font-semibold">{name}</h2>
          <p className="text-black/70 text-sm">{ticker} • {type}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-black/70">
          <div>
            <p className="text-black/70">Market</p>
            <p>{market}</p>
          </div>
          <div>
            <p className="text-black/70">Exchange</p>
            <p>{primary_exchange}</p>
          </div>
          <div>
            <p className="text-black/70">Sector</p>
            <p>{sector || "N/A"}</p>
          </div>
          <div>
            <p className="text-black/70">Share Price</p>
            <p>{currency_name} {sharePrice?.toLocaleString() || "N/A"}</p>
          </div>
          <div>
            <p className="text-black/70">Market Cap</p>
            <p>{marketCap ? `$${marketCap.toLocaleString()}` : "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details