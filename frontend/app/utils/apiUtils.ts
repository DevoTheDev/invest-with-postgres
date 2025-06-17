import axios, { AxiosError, AxiosResponse } from "axios";

export const extractErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<any>;
      const status = axiosError.response?.status;
      const serverMessage = axiosError.response?.data?.message;
      return `(${status}) ${serverMessage || axiosError.message}`;
    }
    return (error as Error)?.message || "Unknown error occurred";
  };
  
  // Auth headers helper
  export const getAuthHeaders = (): { Authorization: string } => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  };