import axios, { AxiosError } from "axios";
import { UserProfile } from "../types/UserProfile";

const extractErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<any>;
    const status = axiosError.response?.status;
    const serverMessage = axiosError.response?.data?.message;
    return `(${status}) ${serverMessage || axiosError.message}`;
  }

  return (error as Error)?.message || "Unknown error occurred";
};

export const getProfile = async (userId: string): Promise<UserProfile> => {
  try {
    const response = await axios.get(`/profiles/${userId}`);
    return response.data.data.profile as UserProfile;
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error("🔴 Get profile failed:", message);
    throw new Error(`Failed to fetch profile: ${message}`);
  }
};

export const createProfile = async (dto: Partial<UserProfile>): Promise<UserProfile> => {
  try {
    const response = await axios.post(`/profiles`, dto);
    return response.data.data.profile as UserProfile;
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error("🔴 Create profile failed:", message);
    throw new Error(`Failed to create profile: ${message}`);
  }
};

export const updateProfile = async (userId: string, dto: Partial<UserProfile>): Promise<UserProfile> => {
  try {
    const response = await axios.put(`/profiles/${userId}`, dto);
    return response.data.data.profile as UserProfile;
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error("🔴 Update profile failed:", message);
    throw new Error(`Failed to update profile: ${message}`);
  }
};

export const deactivateProfile = async (userId: string): Promise<void> => {
  try {
    await axios.delete(`/profiles/${userId}`);
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error("🔴 Deactivate profile failed:", message);
    throw new Error(`Failed to deactivate profile: ${message}`);
  }
};

