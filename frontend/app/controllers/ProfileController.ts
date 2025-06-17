import axios, { AxiosResponse } from "axios";
import { LanguageOption, ThemePreference } from "../types/UserProfile";
import { getAuthHeaders, extractErrorMessage } from "../utils/apiUtils";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  username?: string;
  phone?: string;
  bio?: string;
  avatarUrl?: string;
  themePreference?: ThemePreference;
  language?: LanguageOption;
  notifications?: { email: boolean; push: boolean };
  dataUsage?: { backgroundSync: boolean; activityLogs: boolean };
  isEmailVerified?: boolean;
  isActive?: boolean;
  created_at?: Date; 
  updated_at?: Date;
}

export const getProfile = async (): Promise<AxiosResponse<{ message: string, data: { profile: UserProfile } }>> => {
  try {
    const response = await axios.get('/profiles', { headers: getAuthHeaders() });
    return response;
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error("🔴 Get profile failed:", message);
    throw new Error(`Failed to get profile: ${message}`);
  }
};

export const updateProfile = async (dto: Partial<UserProfile>): Promise<AxiosResponse<{ message: string, data: { updatedProfile: UserProfile } }>> => {
  try {
    const response = await axios.put('/profiles', dto, { headers: getAuthHeaders() });
    return response;
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error("🔴 Update profile failed:", message);
    throw new Error(`Failed to update profile: ${message}`);
  }
};
