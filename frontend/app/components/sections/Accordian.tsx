"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionProps {
  children: React.ReactNode;
  rememberOpenTab?: boolean;
  collapsed?: boolean; // New prop to control default collapsed state
  styling?: {
    container?: string;
    header?: {
      base?: string;
      selected?: string;
      unselected?: string;
    };
    body?: string;
  };
}

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> & {
  Section: React.FC<AccordionSectionProps>;
} = ({
  children,
  rememberOpenTab = false,
  collapsed = false, // Default to false
  styling = {
    container: "w-full rounded-lg",
    header: {
      base: `flex justify-between items-center cursor-pointer px-6 py-4 transition-smooth duration-300 hover:text-black/30 hover:scale-[102%]`,
      selected: "text-black/20",
      unselected: "text-black/50",
    },
    body: "px-6 py-4",
  },
}) => {
  const sections = React.Children.toArray(
    children
  ) as React.ReactElement<AccordionSectionProps>[];

  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getInitialOpenIndex = (): number | null => {
    if (collapsed) return null; // If collapsed is true, override with all sections closed
    if (rememberOpenTab && typeof window !== "undefined") {
      const stored = localStorage.getItem("collapsibleSectionOpenIndex");
      if (stored !== null) {
        const parsed = parseInt(stored, 10);
        return !isNaN(parsed) ? parsed : null;
      }
    }
    return rememberOpenTab ? null : 0; // Open first tab only if not remembering and not collapsed
  };

  const [openIndex, setOpenIndex] = useState<number | null>(() =>
    getInitialOpenIndex()
  );

  const [heights, setHeights] = useState<(string | number)[]>(
    sections.map((_, index) => (index === openIndex ? "auto" : 0))
  );

  useEffect(() => {
    if (rememberOpenTab && openIndex !== null) {
      localStorage.setItem("collapsibleSectionOpenIndex", openIndex.toString());
    } else if (rememberOpenTab) {
      localStorage.removeItem("collapsibleSectionOpenIndex");
    }
  }, [openIndex, rememberOpenTab]);

  useEffect(() => {
    setHeights(
      sections.map((_, index) =>
        openIndex === index && contentRefs.current[index]
          ? contentRefs.current[index]!.scrollHeight
          : 0
      )
    );
  }, [openIndex, sections.length]);

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styling.container}>
      {sections.map((section, index) => (
        <div key={index}>
          {/* Header */}
          <div
            className={`${styling.header!.base} ${
              openIndex === index
                ? styling.header!.selected
                : styling.header!.unselected
            }`}
            onClick={() => toggleSection(index)}
          >
            <h1 className="text-2xl font-bold">{section.props.title}</h1>
            <ChevronDown
              className={`w-6 h-6 transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>

          {/* Body */}
          <div
            ref={(el) => {
              contentRefs.current[index] = el;
            }}
            style={{
              height: heights[index],
              overflow: openIndex === index ? "auto" : "hidden",
              transition: "height 0.3s ease",
            }}
          >
            <div
              className={`${styling.body} ${
                openIndex === index ? "h-max overflow-y-auto" : ""
              }`}
            >
              {section.props.children}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Static section wrapper
const Section: React.FC<AccordionSectionProps> = ({ title, children }) => null;

Accordion.Section = Section;

export default Accordion;
