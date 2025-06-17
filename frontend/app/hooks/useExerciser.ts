import { useContext } from "react";
import { ExerciserContext } from "../contexts/ExerciserContext";

export const useExerciser = () => useContext(ExerciserContext);