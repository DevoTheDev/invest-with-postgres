"use client";
import React from "react";
import { motion } from "framer-motion";

interface SectionProps {
  id: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, children }) => {
  return (
    <motion.section
      id={id}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full min-h-screen flex items-center justify-center snap-start"
    >
      <div className="w-full flex items-center justify-center">
        {children}
      </div>
    </motion.section>
  );
};

const SmoothTransition: React.FC<{ children: React.ReactNode }> & {
  Section: typeof Section;
} = ({ children }) => {
  return (
    <div className="w-full h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory">
      {children}
    </div>
  );
};

SmoothTransition.Section = Section;

export default SmoothTransition;
