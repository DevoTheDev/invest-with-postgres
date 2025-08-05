// services/investmentService.ts
import axios from "axios";
import { Investment } from "../types/Investor";

export interface InvestmentDTO {
  id?: string;
  ticker?: string;
  quantity?: number;
  purchase_price?: number;
  purchase_date?: Date;
}

// Get all investments
export const getInvestments = async (): Promise<Investment[]> => {
  const res = await axios.get(`/investments`, { withCredentials: true });
  return res.data.data.investments as Investment[];
};

// Add new investment
export const addInvestment = async (investment: InvestmentDTO): Promise<Investment> => {
  const res = await axios.post(`/investments`, investment, { withCredentials: true });
  return res.data.data.investment as Investment;
};

// Update existing investment by ID
export const updateInvestment = async (
  investmentId: string,
  updates: InvestmentDTO
): Promise<Investment> => {
  const res = await axios.put(`/investments/${investmentId}`, updates, { withCredentials: true });
  return res.data.data.investment as Investment;
};

// Delete investment by ID
export const deleteInvestment = async (investmentId: string): Promise<Investment[]> => {
  const res = await axios.delete(`/investments/${investmentId}`, { withCredentials: true });
  return res.data.data.investments as Investment[];
};
