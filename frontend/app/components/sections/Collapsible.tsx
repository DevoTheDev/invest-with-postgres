"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CollapsibleProps {
  label: string;
  children: React.ReactNode;
}

const Collapsible: React.FC<CollapsibleProps> = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm w-full max-w-2xl mx-auto my-2">
      <button
        type="button"
        onClick={toggleOpen}
        className="w-full px-4 py-3 text-left text-lg font-semibold text-black bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-gray-300"
        aria-expanded={isOpen}
        aria-controls={`collapsible-content-${label}`}
      >
        <span>{label}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-600"
        >
          {isOpen ? '▲' : '▼'}
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`collapsible-content-${label}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-4 text-gray-800 text-sm bg-white">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Collapsible;