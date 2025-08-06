"use client";
import React from 'react';
import { Stock as StockType } from '@/app/types/Investor';
import Movement from './Movement';
import { useInvestor } from '@/app/hooks/useInvestor';
import Details from './Stock/Details';
import Ticker from './Stock/Ticker';
import { useRouter } from 'next/navigation';


interface StockProps {
  stock: Partial<StockType>;
  searchField?: keyof StockType;
  searchTerm?: string;
  onClick?: (props?: any) => any;
}

const Stock: React.FC<StockProps> = ({ stock, searchField, searchTerm, onClick }) => {
  const { investor, invested, selection, makeSelection, setInvesting } = useInvestor();

  const router = useRouter();

  const handleDetailView = () => {
    makeSelection(stock);
    router.push("/investor/detailedSelection");
  }
  
  const handleClick = () => {
    setInvesting(true);
    makeSelection(stock);
  }

  React.useEffect(() => {
    console.log(selection);
  }, [selection]);
  
  const InvestButton = () => {

    if (invested(stock)) {
      return (
        <div
          onClick={handleClick}
          className={`
        text-green-600/80 hover:bg-green-300 hover:text-white
        transition-all duration-300 transform
        font-semibold flex rounded-full items-center px-5 py-1
        w-max text-sm
        `}>Invested</div>
      )
    } else {
      return (
        <div
          onClick={handleClick}
          className={`
        border border-transparent text-gray-400
        transition-all duration-300 transform hover:bg-white hover:border-green-500/80 hover:text-green-400
        font-semibold flex rounded-full items-center px-5 py-1 w-max text-sm
        `}>Invest</div>
      )
    }
  }
  return (
    <div
      className={`
      border h-full w-full rounded-lg p-6 hover:scale-[1.04] 
      duration-200 transition-transform cursor-pointer
      backdrop-blur-xs hover:backdrop-blur-none flex flex-col justify-between
      bg-gray-100 shadow-xl
      `}
    >
      <Ticker stock={stock} searchField={searchField} searchTerm={searchTerm} />
      <div className='w-full flex justify-between h-max pt-2'>
        <button onClick={handleDetailView}
          className={`
      text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer
      hover:opacity-40 border-1 px-5 py-1 rounded-full
      hover:scale-[1.06] border-transparent
      duration-300 transition-transform
          `}>
          Details
        </button>
        {InvestButton()}
      </div>

    </div>
  );
};

export default Stock;