"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TechDisplay from "./TechDisplay";

const techSections = [
  {
    label: "Frontend",
    props: {
      react: true,
      typescript: true,
      nextjs: true,
      css: true,
      mui: true,
      tailwind: true,
      javascript: true,
      reactnative: true,
      html: true,
    },
  },
  {
    label: "Backend",
    props: {
      express: true,
      python: true,
      typescript: true,
      node: true
    },
  },
  {
    label: "Databases",
    props: {
      postgres: true,
      mongodb: true,
    },
  },
  {
    label: "Infrastructure",
    props: {
      docker: true,
    },
  },
];

interface TechStackProps {
  size?: number;
}

const TechStack = (props: TechStackProps) => {
  const [visibleSections, setVisibleSections] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleSections((prev) => {
        if (prev < techSections.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 500); // stagger delay between each section
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`
    h-max w-full items-center flex flex-col
    rounded-3xl p-12 gap-2
    hover:scale-101 transition-transform hover:shadow-xl
    duration-200 backdrop-blur-xs
    `}>
      {techSections.map((section, index) => (
        <motion.div
          key={section.label}
          initial={{ opacity: 0, y: 20 }}
          animate={visibleSections > index ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
          className="w-full space-y-4"
        >
          <h2 className="text-xl md:text-2xl text-black/30 font-semibold tracking-tight flex text-left">
            {section.label}
          </h2>
          <hr className="border-t border-black/20 w-full" />
          <TechDisplay {...section.props} size={props.size} gap="gap-1" />
        </motion.div>
      ))}
    </div>
  );
};

export default TechStack;
