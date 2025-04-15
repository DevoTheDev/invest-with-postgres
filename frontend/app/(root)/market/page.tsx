"use client";
import React from 'react'
import OpenMarket from '@/app/components/organisms/OpenMarket';

type Props = {}

const page = (props: Props) => {

  return (
    <div className='bg-gray-700' >
      <h1 className='bg-gray-900 p-4 text-center text-xl text-white font-light'>Market</h1>
        <OpenMarket />
    </div>
  )
}

export default page