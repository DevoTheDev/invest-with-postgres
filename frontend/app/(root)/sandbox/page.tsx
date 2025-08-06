"use client";
import Ticker from '@/app/components/investment/Stock/Ticker';
import FlexibleCarousel from '@/app/components/shadcn/expanded/FlexibleCarousel';
import { FlexibleChart } from '@/app/components/shadcn/expanded/FlexibleChart';
import { stocks } from '@/app/defaults/companies/top200';
import React from 'react';


const page = () => {

  const sections = [
    (
      <div className='bg-gray-200 p-6 rounded-xl w-1/2' >
        <Ticker stock={stocks[0]} />
        <FlexibleChart />
      </div>
    ),
    (
      <div className='bg-gray-200 p-6 rounded-xl w-1/2' >
        <Ticker stock={stocks[1]} />
        <FlexibleChart />
      </div>
    ),
    (
      <div className='bg-gray-200 p-6 rounded-xl w-1/2' >
        <Ticker stock={stocks[2]} />
        <FlexibleChart />
      </div>
    ),
    (
      <div className='bg-gray-200 p-6 rounded-xl w-1/2' >
        <Ticker stock={stocks[2]} />
        <FlexibleChart />
      </div>
    ),
  ]

  return (
    <div className='flex bg-gray-900' >
      <FlexibleCarousel sections={sections} />
    </div>
  )
}

export default page