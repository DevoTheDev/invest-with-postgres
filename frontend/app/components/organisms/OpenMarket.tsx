"use client";
import React, { useContext, useState } from "react";
import TopGainersAndLosers from "./TopGainersAndLosers";
import { pricedCompanies, topCompanies } from "@/app/defaults/companies/top200";
import { useUser } from "@/app/hooks/useUser";

const OpenMarket = () => {
  const [error, setError] = useState<string | null>(null);
  const { profile } = useUser();

  return (
    <div className="flex flex-col items-center justify-center gap-10 px-6 py-12 text-white bg-gradient-to-b from-gray-950 to-gray-900 min-h-screen">
      <TopGainersAndLosers />

      <div className="text-center space-y-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow">📈 Open Market</h2>
        
      </div>

      {error && (
        <div className="bg-red-900 border border-red-500 text-red-300 px-4 py-2 rounded shadow">
          {error}
        </div>
      )}

      <div className="w-full max-w-6xl overflow-x-auto rounded-xl shadow-lg">
        <table className="min-w-full text-sm text-left border border-gray-700 rounded overflow-hidden">
          <thead className="bg-gray-800 text-gray-400 uppercase tracking-wider text-xs">
            <tr>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Ticker</th>
              <th className="px-4 py-3">Sector</th>
              <th className="px-4 py-3">Market Cap</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {topCompanies.map((company, i) => (
              <tr
                key={company.ticker + i}
                className="hover:bg-gray-800 transition-all"
              >
                <td className="px-4 py-3 font-medium text-white">{company.name}</td>
                <td className="px-4 py-3 text-green-400 font-semibold">{company.ticker}</td>
                <td className="px-4 py-3 text-gray-300">{company.sector}</td>
                <td className="px-4 py-3 text-gray-300">
                  {company.marketCap}
                  <span className="text-xs ml-1 items-center text-blue-200" >B</span>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full max-w-4xl mt-10 space-y-4">
      
      </div>
    </div>
  );
};

export default OpenMarket;
