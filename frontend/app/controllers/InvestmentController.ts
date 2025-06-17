import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Investment } from "../types/Investor";

export interface InvestmentDTO {
  id?: string;
  ticker?: string;
  quantity?: number;
  purchase_price?: number;
  purchase_date?: Date;
}

// GET all investments (for the logged-in investor)
export const useGetInvestments = () => {
  return useQuery<Investment[]>({
    queryKey: ["investments"],
    queryFn: async () => {
      const res = await axios.get(`/investments`, { withCredentials: true });
      return res.data.data.investments as Investment[];
    },
  });
};

// POST new investment
export const useAddInvestment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (investment: InvestmentDTO): Promise<Investment> => {
      const res = await axios.post(`/investments`, investment, { withCredentials: true });
      return res.data.data.investment as Investment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investments"] });
    },
  });
};

// PUT update existing investment by ID
export const useUpdateInvestment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      investmentId,
      updates,
    }: {
      investmentId: string;
      updates: InvestmentDTO;
    }): Promise<Investment> => {
      const res = await axios.put(`/investments/${investmentId}`, updates, { withCredentials: true });
      return res.data.data.investment as Investment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investments"] });
    },
  });
};

// DELETE investment by ID
export const useDeleteInvestment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (investmentId: string): Promise<Investment[]> => {
      const res = await axios.delete(`/investments/${investmentId}`, { withCredentials: true });
      return res.data.data.investments as Investment[];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investments"] });
    },
  });
};
