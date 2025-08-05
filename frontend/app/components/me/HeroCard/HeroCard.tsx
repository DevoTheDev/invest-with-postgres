"use client";
import React, { useState } from "react";
import MyPictures from "../MyPictures";
import MyExperience from "../MyExperience";

const HeroCard: React.FC = () => {

  return (
    <div className="w-full flex justify-center items-center px-4">
      <div className="flex flex-col items-center justify-center h-full backdrop-blur-sm shadow-md rounded-3xl">
        <div className="flex mobile-flex-col justify-around w-3/4 items-center">
          <div className="flex flex-col text-left w-3/4 mobile-flex-col p-8" >
            <h1
              className={`
            md:text-lg
            sm:text-md
            font-bold 
            `}>Devon Fennell</h1>
            <p
              className={`
            tiny-text
            small-text
            `}>This website is a showcase of my full-stack capabilities and a demonstration of all
              i've learned since I was layed off from my last position. I was very much a junior developer at that
              point and the job market was already falling into a very bad place. I knew I wouldn't stand a chance if
              I didn't learn a whole lot more and put together a testament of all i've learned.
            </p>
          </div>
          <div className="w-2/4 mobile-flex-col" >
            <MyPictures />
          </div>
        </div>
        <MyExperience />
      </div>
    </div>
  );
};

export default HeroCard;
