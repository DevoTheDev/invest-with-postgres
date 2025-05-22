// src/hooks/useInvestor.ts
import { useContext } from 'react';
import { InvestorContext } from '../contexts/InvestorContext';

export const useInvestor = () => {
  const context = useContext(InvestorContext);
  if (!context) throw new Error('useInvestor must be used within a InvestorProvider');
  return context;
};
