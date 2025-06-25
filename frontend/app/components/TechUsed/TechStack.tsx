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

const TechStack = () => {
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
    h-max items-center 
    rounded-3xl p-12 gap-1
    hover:scale-101 transition-transform hover:shadow-xl
    duration-200 backdrop-blur-xs w-3/4
    `}>
    <h1 className="text-black/40 text-4xl w-full justify-end flex font-bold">Stack</h1>
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
          <TechDisplay {...section.props} size={40} />
        </motion.div>
      ))}
    </div>
  );
};

export default TechStack;
