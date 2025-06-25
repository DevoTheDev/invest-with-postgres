"use client";
import React from "react";
import Image from "next/image";
import DynamicStyling from "@/app/utils/styling/DynamicStyling";
import TechDisplay from "../TechUsed/TechDisplay";

const HeroCard = () => {
  const containerClass = DynamicStyling({
    base: "w-full h-full flex flex-col justify-evenly",
    
  });

  const sectionClass = DynamicStyling({
    base: "flex flex-col items justify-start items-start gap-8 text-left relative m-36",
    
  });

  const headingClass = DynamicStyling({
    base: "text-3xl font-extrabold text-black/70 text-center leading-snug text-left",
    
  });

  const paragraphClass = DynamicStyling({
    base: "text-base text-white/80 text-center flex text-left",
    
  });

  const imageWrapper = DynamicStyling({
    base: "relative w-44 h-80 rounded-xl overflow-hidden shadow-xl",
    
  });

  const imageOnePosition = DynamicStyling({
    base: "absolute right-24 bottom-16",
    

  });

  const imageTwoPosition = DynamicStyling({
    base: "absolute right-64 bottom-[-108]",
    

  });

  return (
    <div className={containerClass}>
      <div className={sectionClass}>
        {/* Text Content */}
        <div className="flex flex-col items-center text-center gap-4 w-full md:w-3/4 lg:w-1/2">
          <h1 className={headingClass}>Devon’s Development</h1>
          <p className={paragraphClass}>
            <span className="text-black/70 block">
              This is the delivery of all of Devon's development as a developer.
              A showcase of everything I've built since losing my junior-dev
              position and working relentlessly to grow past my previous
              limitations.
            </span>
          </p>
        </div>

        {/* Portraits */}
        <div className="w-full">
          <div className={imageOnePosition}>
            <div className={imageWrapper}>
              <Image
                src="/personal/Me.png"
                alt="Developer portrait"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          <div className={imageTwoPosition}>
            <div className={imageWrapper}>
              <Image
                src="/personal/meBW.JPG"
                alt="Developer portrait black and white"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
