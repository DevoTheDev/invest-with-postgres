"use client";
import React, { createContext, useState, useCallback, useContext, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import ExerciserController from "../controllers/ExerciserController";
import { Exerciser, Movement } from "../types/Exerciser";
import { useForm } from "react-hook-form";
import { TrainingEmphasis } from "../types/Exerciser";
import { formatHeader } from "../utils/stringUtils";
import { HookForm } from "../components/organisms/HookForm";

type ExerciserContextType = {
  exerciser: Exerciser | null;
  movements: Movement[] | null;
  fetchLoading: boolean;
  updateLoading: boolean;
  fetchMovementsLoading: boolean;
  error: string | null;
  fetchExerciser: () => Promise<void>;
  updateExerciser: (data: Partial<Exerciser>) => Promise<void>;
  fetchMovements: () => Promise<void>;
  form: (isOpen: boolean) => React.ReactNode;
};

export const ExerciserContext = createContext<ExerciserContextType>({
  exerciser: null,
  movements: null,
  fetchLoading: true,
  updateLoading: false,
  fetchMovementsLoading: false,
  error: null,
  fetchExerciser: async () => { },
  updateExerciser: async () => { },
  fetchMovements: async () => { },
  form: (isOpen: boolean) => <></>,
});

export const ExerciserProvider = ({ children }: { children: React.ReactNode }) => {
  const [exerciser, setExerciser] = useState<Exerciser | null>(null);
  const [movements, setMovements] = useState<Movement[] | null>(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [fetchMovementsLoading, setFetchMovementsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { getExerciser, updateExerciser: updateExerciserApi, getMovements } = ExerciserController();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Exerciser>({
    defaultValues: {
      height_cm: 0,
      weekly_workout_frequency: 0,
      weight_kg: 0,
      training_emphasis: TrainingEmphasis.MUSCLE_ENDURANCE,
      body_fat_percentage: 0,
    },
  });

  console.log(movements);
  // Fetch exerciser
  const fetchExerciser = useCallback(async (): Promise<void> => {
    setFetchLoading(true);
    try {
      const response = await getExerciser();
      setExerciser(response.data.data.exerciser);
    } catch (err) {
      console.error("🔴 Failed to fetch exerciser:", err);
      setError((err as Error).message);
      setExerciser(null);
    } finally {
      setFetchLoading(false);
    }
  }, [getExerciser]);

  // Fetch movements
  const fetchMovements = useCallback(async (): Promise<void> => {
    setFetchMovementsLoading(true);
    try {
      const response = await getMovements();
      setMovements(response.data.data); // assuming the API returns { data: movements }
    } catch (err) {
      console.error("🔴 Failed to fetch movements:", err);
      setError((err as Error).message);
      setMovements(null);
    } finally {
      setFetchMovementsLoading(false);
    }
  }, [getMovements]);

  // Reset form when exerciser changes
  useEffect(() => {
    if (exerciser) {
      reset({
        height_cm: exerciser.height_cm,
        weekly_workout_frequency: exerciser.weekly_workout_frequency,
        weight_kg: exerciser.weight_kg,
        training_emphasis: exerciser.training_emphasis,
        body_fat_percentage: exerciser.body_fat_percentage,
      });
    }
  }, [exerciser, reset]);

  useEffect(() => {
    if (user) {
      fetchExerciser();
      fetchMovements();
    } else {
      setExerciser(null);
      setMovements(null);
      setFetchLoading(false);
    }
  }, [user, fetchExerciser, fetchMovements]);

  useEffect(() => {
    console.log("WHAT UR LOOKIN FER : ", exerciser);
  }, [exerciser]);

  // Update exerciser
  const updateExerciser = useCallback(async (data: Partial<Exerciser>): Promise<void> => {
    setUpdateLoading(true);
    setError(null);
    try {
      const response = await updateExerciserApi(data);
      setExerciser(response.data.data);
    } catch (err) {
      console.error("🔴 Failed to update exerciser:", err);
      setError((err as Error).message);
    } finally {
      setUpdateLoading(false);
    }
  }, [updateExerciserApi]);

  const form = (isOpen: boolean) => {
    const onSubmit = async (data: Omit<Exerciser, "programs">) => {
      await updateExerciser(data);
    };

    if (fetchLoading) return <p className="text-center text-gray-600">Loading investor profile...</p>;
    if (error) return <p className="text-red-600 font-medium">Error: {error}</p>;

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto"
      >
        <HookForm.LoadingOrError loading={fetchLoading} error={error!} />

        <HookForm.Section title="Exerciser Preferences">
          <div className="grid grid-cols-2 gap-8" >
            <HookForm.SelectField
              label="Training Emphasis"
              id="training_emphasis"
              register={register("training_emphasis")}
              options={Object.values(TrainingEmphasis)}
              placeholder={formatHeader(exerciser?.training_emphasis!)}
              error={errors.training_emphasis}
            />

            <HookForm.InputField
              label="Height (cm)"
              id="height_cm"
              type="number"
              register={register("height_cm", { min: { value: 0, message: "Height cannot be negative" } })}
              placeholder="Enter your height"
              error={errors.height_cm}
            />

            <HookForm.InputField
              label="Weight (kg)"
              id="weight_kg"
              type="number"
              register={register("weight_kg", { min: { value: 0, message: "Weight cannot be negative" } })}
              placeholder="Enter your weight"
              error={errors.weight_kg}
            />

            <HookForm.InputField
              label="Body Fat Percentage"
              id="body_fat_percentage"
              type="number"
              register={register("body_fat_percentage", { min: { value: 0, message: "Cannot be negative" } })}
              placeholder="Enter your body fat %"
              error={errors.body_fat_percentage}
            />

            <HookForm.InputField
              label="Weekly Workout Frequency"
              id="weekly_workout_frequency"
              type="number"
              register={register("weekly_workout_frequency", { min: { value: 0, message: "Cannot be negative" } })}
              placeholder="Enter weekly frequency"
              error={errors.weekly_workout_frequency}
            />
          </div>
        </HookForm.Section>

        <HookForm.DateInfo created={exerciser?.created_at} updated={exerciser?.updated_at} />

        <HookForm.SubmitButton />
      </form>
    );
  };

  return (
    <ExerciserContext.Provider
      value={{
        exerciser,
        movements,
        fetchLoading,
        updateLoading,
        fetchMovementsLoading,
        error,
        fetchExerciser,
        updateExerciser,
        fetchMovements,
        form,
      }}
    >
      {children}
    </ExerciserContext.Provider>
  );
};