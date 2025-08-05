"use client";
import React from 'react'
import { useAuth } from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useInvestor } from '@/app/hooks/useInvestor';
import { stocks } from '@/app/defaults/companies/top200';
import StockList from '@/app/components/investment/StockList';
import Modal from '@/app/components/atoms/Modal';
import { Stock } from '@/app/types/Investor';
import ParticleBackground from '@/app/components/backgrounds/ParticleBackground';
import Ticker from '@/app/components/investment/Stock/Ticker';
import Investment from '@/app/components/investment/Investment';

type Props = {}

const page = (props: Props) => {
  const router = useRouter();
  const { user } = useAuth();
  const { investor, addInvestment, makeSelection, selection, clearSelection } = useInvestor();

  if (!investor) {
    return null
  }

  const handleItemClick = (item: Partial<Stock>) => {
    makeSelection(item);
  }

  return (
    <div className='flex h-max overflow-y-scroll justify-center items-center'>
      <Modal isOpen={Boolean(selection)} onClose={clearSelection}>
        <ParticleBackground flakeColor="black" flakeCount={1200} direction="down" className="h-full">
        <Investment stock={{...selection}} />
        </ParticleBackground>
      </Modal>
      <div className='flex justify-center w-3/4 h-screen overflow-y-scroll'>
      <StockList stocks={stocks} itemOnClick={handleItemClick} />
      </div>
    </div>  
  )
}

export default page