// components/Spinner.tsx
"use client";
import React from "react";
import clsx from "clsx";

type SpinnerProps = {
  type?: "dots" | "ring";
  color?: string;
  size?: number; // optional pixel size
  className?: string;
};

export const Spinner = ({
  type = "dots",
  color = "#45fed5",
  size = 40,
  className,
}: SpinnerProps) => {
  if (type === "ring") {
    return (
      <div
        className={clsx("inline-block animate-spin", className)}
        style={{
          width: size,
          height: size,
          border: `${size / 8}px solid ${color}33`, // semi-transparent base
          borderTopColor: color,
          borderRadius: "50%",
        }}
      />
    );
  }

  // dots animation
  return (
    <div className={clsx("flex items-center gap-3", className)}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: size / 5,
            height: size / 5,
            backgroundColor: color,
            borderRadius: "50%",
            animation: `bounce 1.4s infinite ease-in-out`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0.7);
            opacity: 0.5;
          }
          40% {
            transform: scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
