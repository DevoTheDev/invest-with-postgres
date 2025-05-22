import axios, { AxiosError } from "axios";
import { Investor } from "../types/Investor";

const extractErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<any>;
    const status = axiosError.response?.status;
    const serverMessage = axiosError.response?.data?.message;
    return `(${status}) ${serverMessage || axiosError.message}`;
  }

  return (error as Error)?.message || "Unknown error occurred";
};

export const getInvestor = async (): Promise<Investor> => {
  try {
    const response = await axios.get(`/investors/`);
    return response.data.data.investor as Investor;
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error("🔴 Get investor failed:", message);
    throw new Error(`Failed to fetch investor: ${message}`);
  }
};

export const createInvestor = async (dto: Partial<Investor>): Promise<Investor> => {
  try {
    const response = await axios.post(`/investors/`, dto);
    return response.data.data.investor as Investor;
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error("🔴 Create investor failed:", message);
    throw new Error(`Failed to create investor: ${message}`);
  }
};

export const updateInvestor = async (dto: Partial<Investor>): Promise<Investor> => {
  try {
    const response = await axios.put(`/investors/`, dto);
    return response.data.data.investor as Investor;
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error("🔴 Update investor failed:", message);
    throw new Error(`Failed to update investor: ${message}`);
  }
};

export const deleteInvestor = async (): Promise<void> => {
  try {
    await axios.delete(`/investors/`);
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error("🔴 Delete investor failed:", message);
    throw new Error(`Failed to delete investor: ${message}`);
  }
};