"use client";
import React from "react";
import MyPictures from "../presentation/MyPictures";
import TechStack from "../TechUsed/TechStack";
import MyExperience from "../presentation/MyExperience";

const HeroCard = () => {

  return (
    <div className="h-full flex justify-center items-center p-24 gap-12">
      {/* Text Content */}
      <div className="w-full flex flex-col justify-between h-full items-center py-10">
        <h1 className="text-3xl font-extrabold text-black/70 text-center leading-snug pb-1">Devon’s Development</h1>
        <p className="text-base text-white/80 text-center flex justify-center">
          <span className="text-black/70 block w-2/3">
            This is the delivery of all of Devon's development as a developer.
            A showcase of everything I've built since losing my junior-dev
            position and working relentlessly to grow past my previous
            limitations.
          </span>
        </p>
        <MyPictures />
        <MyExperience />
      </div>
        <TechStack size={36} />

    </div>
  );
};

export default HeroCard;
