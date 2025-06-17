"use client";
import React from "react";
import { Exercise } from "@/app/types/Exerciser";
import MovementCard from "../atoms/MovementCard";

interface ExerciseCardProps {
  exercise: Exercise;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  return (
    <div className="border border-blue-200 rounded-xl p-4 mb-3 hover:shadow-lg transition">
      <MovementCard movement={exercise} />
      <div className="flex justify-between mt-2 text-sm">
        <span>Sets: <strong>{exercise.sets}</strong></span>
        <span>Reps: <strong>{exercise.reps}</strong></span>
      </div>
    </div>
  );
};

export default ExerciseCard;
