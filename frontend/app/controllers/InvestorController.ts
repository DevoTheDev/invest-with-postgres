// InvestorController.ts
import axios, { AxiosError, AxiosResponse } from "axios";
import { Investor } from "../types/Investor";
import { getAuthHeaders, extractErrorMessage } from "../utils/apiUtils";

const getInvestor = async (): Promise<AxiosResponse<{ message: string, data: { investor: Investor } }>> => {

  try {
    const response = await axios.get('/investors', { headers: getAuthHeaders() });
    return response;
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error("🔴 Get investor failed:", message);
    if (axios.isAxiosError(error) && error.response) {
      console.error("🔴 Axios response data:", error.response.data);
    }
    throw new Error(`Failed to get investor: ${message}`);
  }
};


const updateInvestor = async (dto: Investor): Promise<AxiosResponse<{ message: string, data: { updatedInvestor: Investor } }>> => {
  try {
    const response = await axios.put('/investors', dto, { headers: getAuthHeaders() });
    return response;
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error("🔴 Update investor failed:", message);
    throw new Error(`Failed to update investor: ${message}`);
  }
};

const InvestorController = () => {
  return {
    getInvestor,
    updateInvestor,
  };
};

export default InvestorController;
