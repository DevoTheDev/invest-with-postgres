"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HeartRateTracker } from "../molecules/HeartRateTracker";
import { StepCounter } from "../molecules/StepCounter";

export const FitnessDashboard: React.FC = () => {
  const [bpm, setBpm] = useState(72);
  const [steps, setSteps] = useState(2000);

  // Simulate live updates
  useEffect(() => {
    const heartInterval = setInterval(() => {
      const fluctuation = Math.floor(Math.random() * 10 - 5); // ±5
      setBpm((prev) => Math.max(50, Math.min(160, prev + fluctuation)));
    }, 2500);

    const stepInterval = setInterval(() => {
      const stepIncrease = Math.floor(Math.random() * 30);
      setSteps((prev) => prev + stepIncrease);
    }, 1500);

    return () => {
      clearInterval(heartInterval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          key="heart"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <HeartRateTracker bpm={bpm} />
        </motion.div>

        <motion.div
          key="steps"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <StepCounter steps={steps} />
        </motion.div>
      </motion.div>
    </main>
  );
};
