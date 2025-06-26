import { motion } from 'framer-motion';
import React from 'react'

type Props = {}

const MyExperience = (props: Props) => {
    const items = [
        { value: "4+", label: "Years Experience" },
        { value: "2", label: "Years Professional Experience" },
        { value: "6000+", label: "Hours in Development" },
      ];
    
      return (
        <motion.div
          className="w-full max-w-3xl mx-auto px-6 py-10 border border-white/10  text-white rounded-3xl shadow-xl backdrop-blur-md"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
            {items.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <h2 className="text-5xl font-bold text-white">{item.value}</h2>
                <p className="text-sm uppercase tracking-wide text-white/60 mt-2">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      );
    };

export default MyExperience