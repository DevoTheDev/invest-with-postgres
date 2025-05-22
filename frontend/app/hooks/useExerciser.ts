import { useContext } from "react";
import { ExerciserContext } from "../contexts/ExerciserContext";

export const useExerciser = () => {
    const context = useContext(ExerciserContext);
    if (!context) throw new Error('useExerciser must be used within a ExerciserProvider');
    return context;
  };