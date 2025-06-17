"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface CollapsibleSectionProps {
  sections: { title: string; content: React.ReactNode }[];
  defaultOpenIndex?: number; // Optional prop to set which section is open by default
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  sections,
  defaultOpenIndex = 0,
}) => {
  // Initialize openIndex from localStorage or defaultOpenIndex
  const [openIndex, setOpenIndex] = useState<number | null>(() => {
    if (typeof window === "undefined") return defaultOpenIndex; // Avoid SSR issues
    const storedIndex = localStorage.getItem("collapsibleSectionOpenIndex");
    if (storedIndex !== null) {
      const parsedIndex = parseInt(storedIndex, 10);
      // Ensure the stored index is valid (within sections array bounds)
      if (!isNaN(parsedIndex) && parsedIndex >= 0 && parsedIndex < sections.length) {
        return parsedIndex;
      }
    }
    return defaultOpenIndex;
  });

  // Refs and heights for each section
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [heights, setHeights] = useState<(string | number)[]>(
    sections.map((_, index) => (index === openIndex ? "auto" : 0))
  );

  // Update localStorage when openIndex changes
  useEffect(() => {
    if (openIndex !== null) {
      localStorage.setItem("collapsibleSectionOpenIndex", openIndex.toString());
    } else {
      localStorage.removeItem("collapsibleSectionOpenIndex");
    }
  }, [openIndex]);

  // Update heights when sections or openIndex change
  useEffect(() => {
    setHeights(
      sections.map((_, index) =>
        openIndex === index && contentRefs.current[index]
          ? contentRefs.current[index]!.scrollHeight
          : 0
      )
    );
  }, [openIndex, sections]);

  // Toggle section handler
  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mx-auto bg-gray-100 shadow-md w-2/3 rounded-lg overflow-hidden">
      {sections.map((section, index) => (
        <div key={index}>
          {/* Section Header */}
          <div
            className={`flex justify-between items-center cursor-pointer px-6 py-4 transition-colors duration-300 ${
              openIndex === index ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => toggleSection(index)}
          >
            <h1 className="text-2xl font-bold">{section.title}</h1>
            <ChevronDown
              className={`w-6 h-6 transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>

          {/* Collapsible Content */}
          <div
            ref={(el) => {
              contentRefs.current[index] = el;
            }}
            style={{
              height: heights[index],
              overflow: "hidden",
              transition: "height 0.3s ease",
            }}
          >
            <div className="px-6 py-4">{section.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollapsibleSection;