"use client";
import React, { createContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { Investor } from "../types/Investor";
import * as InvestorController from "../controllers/InvestorController";
import { useProfile } from "../hooks/useProfile";

type InvestorContextType = {
  investor: Investor | null;
  loading: boolean;
  error: string | null;
  updateInvestor: (data: Partial<Investor>) => Promise<void>;
  deleteInvestor: () => Promise<void>;
};

export const InvestorContext = createContext<InvestorContextType>({
  investor: null,
  loading: true,
  error: null,
  updateInvestor: async () => {},
  deleteInvestor: async () => {},
});

export const InvestorProvider = ({ children }: { children: React.ReactNode }) => {
  const { token, user } = useAuth();
  const { profile } = useProfile(); // Get profile from ProfileContext
  const router = useRouter();
  const [investor, setInvestor] = useState<Investor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Investor state:", investor);
  }, [investor]);

  // Fetch investor when user, token, or profile changes
  useEffect(() => {
    if (!user?.id || !token) {
      setInvestor(null);
      setLoading(false);
      setError("User not authenticated");
      return;
    }

    if (!profile) {
      setInvestor(null);
      setLoading(false);
      setError("Cannot create investor: User profile not found. Please create a profile first.");
      return;
    }

    const fetchInvestor = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Trying to get investor for user.id:", user.id);
        const data = await InvestorController.getInvestor();
        console.log("Investor fetched:", data);
        setInvestor(data);
      } catch (err: any) {
        console.log("Error fetching investor:", err.message, err);
        if (err.message?.includes("(404) Investor not found")) {
          try {
            console.log("Investor not found, creating new one for user:", user.id);
            const newInvestor = await InvestorController.createInvestor({
              user_id: user.id,
            });
            console.log("New investor created:", newInvestor);
            setInvestor(newInvestor);
          } catch (createErr: any) {
            console.error("Failed to create investor:", createErr.message, createErr);
            setError(createErr.message || "Failed to create investor");
            setInvestor(null);
          }
        } else {
          setError(err.message || "Failed to load investor");
          setInvestor(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInvestor();
  }, [user?.id, token, profile]);

  // Update investor handler
  const updateInvestor = useCallback(
    async (data: Partial<Investor>) => {
      if (!user?.id || !token) {
        setError("User not authenticated");
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const updated = await InvestorController.updateInvestor(data);
        setInvestor(updated);
      } catch (err: any) {
        setError(err.message || "Failed to update investor");
      } finally {
        setLoading(false);
      }
    },
    [user?.id, token]
  );

  // Delete investor handler
  const deleteInvestor = useCallback(async () => {
    if (!user?.id || !token) {
      setError("User not authenticated");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await InvestorController.deleteInvestor();
      setInvestor(null);
      router.push("/"); // Redirect user after delete
    } catch (err: any) {
      setError(err.message || "Failed to delete investor");
    } finally {
      setLoading(false);
    }
  }, [user?.id, token, router]);

  return (
    <InvestorContext.Provider
      value={{
        investor,
        loading,
        error,
        updateInvestor,
        deleteInvestor,
      }}
    >
      {children}
    </InvestorContext.Provider>
  );
};