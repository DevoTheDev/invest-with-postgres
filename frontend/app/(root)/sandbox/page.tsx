"use client";
import React from 'react'
import { useAuth } from '@/app/hooks/useAuth';
import { defaultTickers } from '@/app/defaults/polygonIo-defaults/defaultTickers';
import TickerSearch from '@/app/components/organisms/TickerSearch';

type Props = {}

const page = () => {
  const { apiBaseUrl } = useAuth();


  return (
    <div className='flex' >
      <TickerSearch
        tickers={defaultTickers.results}
        styles={{
          container: "w-full max-w-3xl mx-auto p-4 space-y-4 bg-gray-400",
          input:
            "w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500",
          list: "space-y-2",
          item:
            "p-4 cursor-pointer bg-white rounded-xl shadow transition transform hover:shadow-xl hover:bg-gray-50 hover:scale-[1.02] duration-200 ease-in-out",
          tickerName: "text-lg font-semibold",
          exchange: "text-sm text-gray-500",
          meta: "text-sm text-gray-700",
          date: "text-xs text-gray-400 mt-1",
          highlight: "bg-yellow-200 px-1 rounded",
          noResults: "text-center text-gray-400",
        }}


      />
    </div>
  )
}

export default page