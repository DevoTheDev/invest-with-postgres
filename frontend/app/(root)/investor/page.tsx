"use client";
import React from 'react'
import { useAuth } from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useInvestor } from '@/app/hooks/useInvestor';
import { stocks } from '@/app/defaults/companies/top200';
import CollapsibleSection from '@/app/components/sections/CollapsibleSection';
import { formatHeader } from '@/app/utils/stringUtils';

type Props = {}

const page = (props: Props) => {
  const router = useRouter();
  const { user } = useAuth();
  const { investor, addInvestment } = useInvestor();

  console.log(investor);

  if (!investor) {
    return null
  }

  return (
    <div className='gap-8 overflow-x-scroll  h-screen'>
      <div className='grid grid-cols-1 gap-4 w-max' >
        {Object.entries(investor!).map(([k, v], i) => {
          if(typeof v === "object") {
            return (
              <div key={i} className='flex flex-col p-4 bg-black/10 rounded-xl'>
                <span>{formatHeader(k)}</span>
              <hr className='border border-black/20' ></hr>

                {v.map((val) => {
                  return (
                    <div key={i} >{JSON.stringify(val)}</div>
                  )
                })}
              </div>
            )
          }

          return (
            <div key={i} className='flex flex-col p-4 bg-black/10 rounded-xl'>
              <h1 className='w-full'>{formatHeader(k)}:</h1>
              <hr className='border border-black/20' ></hr>
              <span className='w-full'>{String(v)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default page