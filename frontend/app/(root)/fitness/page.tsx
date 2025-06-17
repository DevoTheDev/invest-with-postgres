"use client";
import React from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useExerciser } from "@/app/hooks/useExerciser";
import MovementCard, { MovementDraft } from "@/app/components/atoms/MovementCard";

type Props = {}

const MovementPage = (props: Props) => {
  const { movements } = useExerciser();

  const [drafts, setDrafts] = React.useState<MovementDraft[]>([]);

  const handleDraftChange = (newDraft: MovementDraft) => {
    setDrafts((prev) => {
      const existing = prev.find((d) => d.movementId === newDraft.movementId);
      if (existing) {
        return prev.map((d) => (d.movementId === newDraft.movementId ? newDraft : d));
      } else {
        return [...prev, newDraft];
      }
    });
  };

  const submitWorkout = () => {
    console.log("Workout Draft:", drafts);
    // TODO: Send to backend or persist to state
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Select Exercises</h1>
      {movements?.map((m, i) => (
        <MovementCard movement={m} key={i} onDraftChange={handleDraftChange} />
      ))}
      <button
        onClick={submitWorkout}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Save Workout
      </button>
    </div>
  );
};

export default MovementPage;