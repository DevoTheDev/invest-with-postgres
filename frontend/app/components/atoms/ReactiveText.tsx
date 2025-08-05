"use client";
import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import ColoredText from "./ColoredText"; // Import ColoredText component

interface ReactiveTextProps {
  text: string;
  flashlightSize?: string; // Size of the flashlight circle (e.g., "100px")
  containerClass?: string; // Custom classes for the container
  textClass?: string; // Base classes for the text
  colors?: [string] | [string, string] | [string, string, string]; // Colors for ColoredText
  size?: string; // Tailwind text size class
  weight?: string; // Tailwind font weight class
  shadow?: boolean; // Apply drop-shadow to ColoredText
}

const ReactiveText: React.FC<ReactiveTextProps> = ({
  text,
  flashlightSize = "100px",
  containerClass = "w-full max-w-3xl mx-auto",
  textClass = "text-white",
  colors = ["#FF0000", "#00FF00", "#0000FF"], // Default colors for pendulum effect
  size = "text-4xl",
  weight = "font-bold",
  shadow = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setCursor({ x, y });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", () => setIsHovered(true));
      container.addEventListener("mouseleave", () => setIsHovered(false));
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", () => setIsHovered(true));
        container.removeEventListener("mouseleave", () => setIsHovered(false));
      }
    };
  }, []);

  return (
    <div className="flex w-max h-max items-center justify-center ">
      <div
        ref={containerRef}
        className={`relative ${containerClass}`}
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background text (dimmed, with ColoredText pendulum effect) */}
        <div
          className={clsx(textClass, "transition-opacity duration-300")}
          style={{ opacity: isHovered ? 0.2 : 1 }}
        >
          <ColoredText colors={colors} size={size} weight={weight} shadow={shadow}>
            {text}
          </ColoredText>
        </div>

        {/* Flashlight effect with mask */}
        <div
          className={clsx(textClass, "absolute inset-0")}
          style={{
            maskImage: isHovered
              ? `radial-gradient(circle ${flashlightSize} at ${cursor.x}px ${cursor.y}px, white 100%, transparent 10%)`
              : "none",
            WebkitMaskImage: isHovered
              ? `radial-gradient(circle ${flashlightSize} at ${cursor.x}px ${cursor.y}px, white 100%, transparent 10%)`
              : "none",
            pointerEvents: "none",
          }}
        >
          <ColoredText colors={colors} size={size} weight={weight} shadow={shadow}>
            {text}
          </ColoredText>
        </div>
      </div>
    </div>
  );
};

export default ReactiveText;