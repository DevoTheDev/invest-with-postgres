"use client";
import React, { createContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { UserProfile } from "../../../backend/src/types/shared/shared-types";
import * as ProfileController from "../controllers/ProfileController";

type ProfileContextType = {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  deleteProfile: () => Promise<void>;
};

export const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  loading: true,
  error: null,
  updateProfile: async () => {},
  deleteProfile: async () => {},
});

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const { token, user } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch profile when user or token changes
  useEffect(() => {
    if (!user?.id || !token) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Trying to get profile for user.id:", user.id);
        const data = await ProfileController.getProfile(user.id);
        console.log("Profile fetched:", data);
        setProfile(data);
      } catch (err: any) {
        console.log("Error fetching profile:", err);
        if (err.response?.status === 404) {
          try {
            console.log("Profile not found, creating new one for user:", user.id);
            const newProfile = await ProfileController.createProfile({
              id: user.id,
              email: user.email,
            });
            console.log("New profile created:", newProfile);
            setProfile(newProfile);
          } catch (createErr: any) {
            console.error("Failed to create profile:", createErr);
            setError(createErr.message || "Failed to create profile");
            setProfile(null);
          }
        } else {
          setError(err.message || "Failed to load profile");
          setProfile(null);
        }
      } finally {
        setLoading(false);
      }
    };
    
    

    fetchProfile();
  }, [user?.id, token]);

  // Update profile handler
  const updateProfile = useCallback(
    async (data: Partial<UserProfile>) => {
      if (!user?.id || !token) {
        setError("User not authenticated");
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const updated = await ProfileController.updateProfile(user.id, data);
        setProfile(updated);
      } catch (err: any) {
        setError(err.message || "Failed to update profile");
      } finally {
        setLoading(false);
      }
    },
    [user?.id, token]
  );

  // Delete profile handler
  const deleteProfile = useCallback(async () => {
    if (!user?.id || !token) {
      setError("User not authenticated");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await ProfileController.deactivateProfile(user.id);
      setProfile(null);
      router.push("/"); // Redirect user after delete
    } catch (err: any) {
      setError(err.message || "Failed to delete profile");
    } finally {
      setLoading(false);
    }
  }, [user?.id, token, router]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        error,
        updateProfile,
        deleteProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
