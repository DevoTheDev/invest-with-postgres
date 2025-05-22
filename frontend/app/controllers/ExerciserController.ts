import axios, { AxiosError } from "axios";
import { Exerciser } from "../types/Exerciser";

const extractErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<any>;
    const status = axiosError.response?.status;
    const serverMessage = axiosError.response?.data?.message;
    return `(${status}) ${serverMessage || axiosError.message}`;
  }

  return (error as Error)?.message || "Unknown error occurred";
};

export const getExerciser = async (): Promise<Exerciser> => {
  try {
    const response = await axios.get(`/exercisers/`);
    return response.data.data.exerciser as Exerciser;
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error("🔴 Get exerciser failed:", message);
    throw new Error(`Failed to fetch exerciser: ${message}`);
  }
};

export const createExerciser = async (dto: Partial<Exerciser>): Promise<Exerciser> => {
  try {
    const response = await axios.post(`/exercisers/`, dto);
    return response.data.data.exerciser as Exerciser;
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error("🔴 Create exerciser failed:", message);
    throw new Error(`Failed to create exerciser: ${message}`);
  }
};

export const updateExerciser = async (dto: Partial<Exerciser>): Promise<Exerciser> => {
  try {
    const response = await axios.put(`/exercisers/`, dto);
    return response.data.data.exerciser as Exerciser;
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error("🔴 Update exerciser failed:", message);
    throw new Error(`Failed to update exerciser: ${message}`);
  }
};

export const deleteExerciser = async (): Promise<void> => {
  try {
    await axios.delete(`/exercisers/`);
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error("🔴 Delete exerciser failed:", message);
    throw new Error(`Failed to delete exerciser: ${message}`);
  }
};