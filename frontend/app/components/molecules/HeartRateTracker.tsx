"use client";
import React from "react";
import { HeartPulse } from "lucide-react";

interface HeartRateTrackerProps {
  bpm: number; // beats per minute
  timestamp?: string; // optional timestamp
  targetRange?: [number, number]; // e.g., [60, 100]
}

export const HeartRateTracker: React.FC<HeartRateTrackerProps> = ({
  bpm,
  timestamp,
  targetRange = [60, 100],
}) => {
  const [min, max] = targetRange;
  const status =
    bpm < min ? "low" : bpm > max ? "high" : "normal";

  const colorMap = {
    low: "text-blue-500",
    high: "text-red-500",
    normal: "text-green-500",
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-sm flex items-center justify-between">
      <div className="flex items-center gap-4">
        <HeartPulse className={`w-8 h-8 ${colorMap[status]}`} />
        <div>
          <p className="text-xl font-bold">{bpm} BPM</p>
          <p className={`text-sm ${colorMap[status]}`}>
            {status.toUpperCase()} Heart Rate
          </p>
        </div>
      </div>
      {timestamp && (
        <span className="text-xs text-gray-400">
          {new Date(timestamp).toLocaleTimeString()}
        </span>
      )}
    </div>
  );
};
