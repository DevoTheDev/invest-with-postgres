"use client";
import React from "react";
import { Workout } from "@/app/types/Exerciser";
import ExerciseCard from "../molecules/ExerciseCard";

interface WorkoutCardProps {
  workout: Workout;
  index: number;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, index }) => {
  return (
    <div className="bg-blue-50 rounded-xl p-4 mb-6">
      <h2 className="font-semibold text-blue-800 text-xl mb-3">
        {workout.title}
      </h2>
      <div className="space-y-3">
        {workout.workouts.map((work, i) => {
            return (
                <ExerciseCard key={i} exercise={work} />
            )
        })}
      </div>
    </div>
  );
};

export default WorkoutCard;
