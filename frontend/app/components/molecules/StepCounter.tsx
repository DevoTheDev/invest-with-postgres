"use client";
import React from "react";
import { Footprints } from "lucide-react";

interface StepCounterProps {
  steps: number;
  goal?: number;
  date?: string;
}

export const StepCounter: React.FC<StepCounterProps> = ({
  steps,
  goal = 10000,
  date,
}) => {
  const progress = Math.min(steps / goal, 1);
  const percent = Math.round(progress * 100);

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-sm">
      <div className="flex items-center gap-4 mb-4">
        <Footprints className="w-8 h-8 text-indigo-600" />
        <div>
          <p className="text-xl font-bold">{steps.toLocaleString()} steps</p>
          <p className="text-sm text-gray-500">
            Goal: {goal.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="w-full bg-gray-200 h-3 rounded-full">
        <div
          className="h-3 bg-indigo-500 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      {date && (
        <p className="text-xs text-gray-400 mt-2">
          {new Date(date).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};
