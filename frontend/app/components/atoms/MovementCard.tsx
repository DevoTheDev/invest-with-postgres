"use client";

import React from "react";
import { Movement } from "@/app/types/Exerciser";

interface MovementCardProps {
  movement: Movement;
  onDraftChange: (draft: MovementDraft) => void;
}

export interface MovementDraft {
  title: string;
  sets: number;
  reps: number;
}

const MovementCard: React.FC<MovementCardProps> = ({ movement, onDraftChange }) => {
  const [isDrafting, setIsDrafting] = React.useState(false);
  const [sets, setSets] = React.useState(0);
  const [reps, setReps] = React.useState(0);

  const handleChange = (type: "sets" | "reps", value: number) => {
    const newDraft = {
      title: movement.title,
      sets: type === "sets" ? value : sets,
      reps: type === "reps" ? value : reps,
    };
    if (type === "sets") setSets(value);
    if (type === "reps") setReps(value);
    onDraftChange(newDraft);
  };

  return (
    <div
      className={`bg-white rounded-xl shadow p-4 mb-4 transition-all ${
        isDrafting ? "ring-2 ring-blue-500" : ""
      }`}
    >
      <h3 className="font-bold text-lg">{movement.title}</h3>
      <p className="text-gray-600 text-sm mb-2">{movement.description}</p>

      <button
        onClick={() => setIsDrafting((prev) => !prev)}
        className="text-blue-600 text-sm underline mb-2"
      >
        {isDrafting ? "Cancel" : "Add Sets & Reps"}
      </button>

      {isDrafting && (
        <div className="flex gap-4 items-center mt-2">
          <div>
            <label className="block text-sm text-gray-700">Sets</label>
            <input
              type="number"
              value={sets}
              onChange={(e) => handleChange("sets", parseInt(e.target.value))}
              className="border p-1 rounded w-16"
              min={0}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Reps</label>
            <input
              type="number"
              value={reps}
              onChange={(e) => handleChange("reps", parseInt(e.target.value))}
              className="border p-1 rounded w-16"
              min={0}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovementCard;
