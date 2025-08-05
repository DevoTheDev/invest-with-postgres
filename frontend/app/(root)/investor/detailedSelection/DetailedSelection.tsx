"use client";
import React from 'react'
import { useInvestor } from '@/app/hooks/useInvestor';
import Movement from '@/app/components/investment/Movement';
import Details from '@/app/components/investment/Stock/Details';
import SharesCounter from '@/app/components/investment/SharesCounter';

type Props = {}

const DetailedSelection = (props: Props) => {

    const { selection } = useInvestor();

    return (
        <div className='flex p-12 justify-around'>
            <div className='flex flex-col w-1/4 gap-8' >
            <div className='w-full'>
                <Details {...selection!} />
            </div>
            <div className='w-full'>
                <Movement movement={selection?.movement!} />
            </div>
            </div>
            <div className='w-1/3'>
                <SharesCounter currentShares={0} currentPrice={selection?.sharePrice!} />
            </div>
        </div>
    )
}

export default DetailedSelection