'use client'

import React, { useState } from 'react'
import { useMarket } from '../../hooks/useMarket'
import { defaultGainersAndLosers } from '../../defaults/alphaVantage-defaults/defaultGainersAndLosers'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import HorizontalTickerScroll from '../molecules/HorizontalTickerScroll'
import DropdownSelector from '../atoms/DropdownSelector'

type Props = {}

const parsePercentage = (percentStr: string): number => {
  return parseFloat(percentStr.replace('%', ''))
}

type ViewMode = 'gainers' | 'losers' | 'both'

const TopGainersAndLosers = (props: Props) => {
  const activeData = defaultGainersAndLosers

  const [viewMode, setViewMode] = useState<ViewMode>('gainers')

  const renderItem = (
    item: (typeof defaultGainersAndLosers.top_gainers)[number],
    isGainer: boolean
  ) => {
    const formattedChange = `${parsePercentage(String(item.change_percentage)).toFixed(2)}%`

    return (
      <div
        className={`flex items-center gap-3 px-4 py-2 rounded-xl shadow-sm ${
          isGainer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}
      >
        <div className="font-bold text-sm">{item.ticker}</div>
        <div className={`text-sm font-semibold ${isGainer ? 'text-green-600' : 'text-red-600'}`}>
          {formattedChange}
        </div>
        {isGainer ? (
          <ArrowUpRight className="w-4 h-4 text-green-500" />
        ) : (
          <ArrowDownRight className="w-4 h-4 text-red-500" />
        )}
      </div>
    )
  }

  return (
    <div className="w-full bg-white dark:bg-zinc-900 py-4 border-y border-zinc-200 dark:border-zinc-700">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Custom Dropdown Selector with Styling via Props */}
        <DropdownSelector
          value={viewMode}
          onChange={(value) => setViewMode(value as ViewMode)}
          options={[
            { label: 'Top Gainers', value: 'gainers' },
            { label: 'Top Losers', value: 'losers' },
            { label: 'Both', value: 'both' }
          ]}
          buttonClassName={`
          px-4 py-2 text-sm text-zinc-700 
          dark:text-zinc-200 bg-white dark:bg-zinc-800 
          rounded-lg border border-zinc-300 dark:border-zinc-600 
          shadow-md text-white hover:bg-zinc-700 bg-white
          cursor-pointer flex items-center justify-between w-full
          `}
          optionsClassName={`
          dark:bg-blue-800 dark:border-blue-600
          left-0 w-full mt-1 bg-white dark:bg-zinc-800
           border border-zinc-300 dark:border-zinc-600 
          rounded-lg shadow-lg z-10 transition-all duration-200 ease-in-out 
          `}
          optionItemClassName={`
          hover:bg-zinc-200 dark:hover:bg-blue-700 rounded-md
          cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 
          px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200
          `}
          iconClassName={`
          text-gray-300
          w-4 h-4 transform transition-transform
          `}
        />

        {/* Conditionally Render Scrollers */}
        {viewMode === 'gainers' || viewMode === 'both' ? (
          <HorizontalTickerScroll
            data={activeData.top_gainers}
            label="Top Gainers"
            renderItem={(item, idx) => (
              <div key={idx}>{renderItem(item, true)}</div>
            )}
          />
        ) : null}

        {viewMode === 'losers' || viewMode === 'both' ? (
          <HorizontalTickerScroll
            data={activeData.top_losers}
            label="Top Losers"
            renderItem={(item, idx) => (
              <div key={idx}>{renderItem(item, false)}</div>
            )}
          />
        ) : null}
      </div>
    </div>
  )
}

export default TopGainersAndLosers
