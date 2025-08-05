"use client";
import React, { useEffect, useState } from "react";

type Props = {};

const MyExperience = (props: Props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger visibility after mount
    const timeout = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const items = [
    { value: "4+", label: "Years Experience" },
    { value: "2", label: "Years Professional Experience" },
    { value: "6000+", label: "Hours in Development" },
  ];

  return (
    <div
      className={`
        w-full p-6
        border border-white/10 
        text-white rounded-3xl shadow-xl backdrop-blur-sm
        transition-all duration-1000 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      <div className="grid grid-cols-3 gap-10 text-center">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <h2 className="md:text-4xl sm:text-2xl font-bold text-white">
              {item.value}
            </h2>
            <p className="tiny-text text-xs uppercase tracking-wide text-white/60 mt-2">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyExperience;
