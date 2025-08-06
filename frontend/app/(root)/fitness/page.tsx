"use client";
import React from "react";

type Props = {}

const MovementPage = (props: Props) => {

  const [drafts, setDrafts] = React.useState<any[]>([]);

  const submitWorkout = () => {
    console.log("Workout Draft:", drafts);
    // TODO: Send to backend or persist to state
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Select Exercises</h1>
      
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