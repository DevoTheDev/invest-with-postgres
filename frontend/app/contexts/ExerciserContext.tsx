"use client";
import React, { createContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { Exerciser } from "../types/Exerciser";
import * as ExerciseController from "../controllers/ExerciserController";

type ExerciserContextType = {
  exerciser: Exerciser | null;
  loading: boolean;
  error: string | null;
  updateExerciser: (data: Partial<Exerciser>) => Promise<void>;
  deleteExerciser: () => Promise<void>;
};

export const ExerciserContext = createContext<ExerciserContextType>({
  exerciser: null,
  loading: true,
  error: null,
  updateExerciser: async () => {},
  deleteExerciser: async () => {},
});

export const ExerciserProvider = ({ children }: { children: React.ReactNode }) => {
  const { token, user } = useAuth();
  const router = useRouter();
  const [exerciser, setExerciser] = useState<Exerciser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Exerciser state:", exerciser);
  }, [exerciser]);

  // Fetch exerciser when user or token changes
  useEffect(() => {
    if (!user?.id || !token) {
      setExerciser(null);
      setLoading(false);
      return;
    }

    const fetchExerciser = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Trying to get exerciser for user.id:", user.id);
        const data = await ExerciseController.getExerciser();
        console.log("Exerciser fetched:", data);
        setExerciser(data);
      } catch (err: any) {
        console.log("Error fetching exerciser:", err);
        if (err.message.includes("(404) Exerciser not found")) {
          try {
            console.log("Exerciser not found, creating new one for user:", user.id);
            const newExerciser = await ExerciseController.createExerciser({
              user_id: user.id,
            });
            console.log("New exerciser created:", newExerciser);
            setExerciser(newExerciser);
          } catch (createErr: any) {
            console.error("Failed to create exerciser:", createErr);
            setError(createErr.message || "Failed to create exerciser");
            setExerciser(null);
          }
        } else {
          setError(err.message || "Failed to load exerciser");
          setExerciser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchExerciser();
  }, [user?.id, token]);

  // Update exerciser handler
  const updateExerciser = useCallback(
    async (data: Partial<Exerciser>) => {
      if (!user?.id || !token) {
        setError("User not authenticated");
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const updated = await ExerciseController.updateExerciser(data);
        setExerciser(updated);
      } catch (err: any) {
        setError(err.message || "Failed to update exerciser");
      } finally {
        setLoading(false);
      }
    },
    [user?.id, token]
  );

  // Delete exerciser handler
  const deleteExerciser = useCallback(async () => {
    if (!user?.id || !token) {
      setError("User not authenticated");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await ExerciseController.deleteExerciser();
      setExerciser(null);
      router.push("/"); // Redirect user after delete
    } catch (err: any) {
      setError(err.message || "Failed to delete exerciser");
    } finally {
      setLoading(false);
    }
  }, [user?.id, token, router]);

  return (
    <ExerciserContext.Provider
      value={{
        exerciser,
        loading,
        error,
        updateExerciser,
        deleteExerciser,
      }}
    >
      {children}
    </ExerciserContext.Provider>
  );
};