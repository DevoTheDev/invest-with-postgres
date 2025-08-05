"use client";
import React from "react";
import Image from "next/image";

const MyPicturesMobile: React.FC = () => {
  return (
    <div
      className={`
        relative h-[14rem] md:h-[20rem]
        w-full
        backdrop-blur-md rounded-xl md:mb-12
      `}
      role="group"
      aria-label="Developer portrait images"
    >
      <div
        className={`
          absolute -translate-x-1/2 z-10
          bottom-[10%] left-[30%]
          w-[70px] h-[160px] md:w-[90px] md:h-[200px]
        `}
      >
        <Image
          src="/personal/Me.png"
          alt="Developer portrait"
          fill
          className="rounded-xl shadow-xl object-cover"
          priority
        />
      </div>
      <div
        className={`
          absolute -translate-x-1/2 z-10
          top-[10%] left-[70%]
          w-[70px] h-[160px] md:w-[90px] md:h-[200px]
        `}
      >
        <Image
          src="/personal/meBW.JPG"
          alt="Developer portrait black and white"
          fill
          className="rounded-xl shadow-2xl object-cover object-[35%_center]"
          priority
        />
      </div>
    </div>
  );
};

const MyPicturesDesktop: React.FC = () => {
  return (
    <div
      className={`
        relative h-[14rem] md:h-[20rem]
        backdrop-blur-md rounded-xl md:mb-12
      `}
      role="group"
      aria-label="Developer portrait images"
    >
      <div
        className={`
          absolute -translate-x-1/2 z-10
          top-[3%] lg:left-[30%] md:left-[20%]
          w-[100px] h-[260px]
        `}
      >
        <Image
          src="/personal/Me.png"
          alt="Developer portrait"
          fill
          className="rounded-xl shadow-xl object-cover"
          priority
        />
      </div>
      <div
        className={`
          absolute -translate-x-1/2 z-10
          top-[10%] left-[70%]
          w-[100px] h-[260px]
        `}
      >
        <Image
          src="/personal/meBW.JPG"
          alt="Developer portrait black and white"
          fill
          className="rounded-xl shadow-2xl object-cover object-[35%_center]"
          priority
        />
      </div>
    </div>
  );
};

const ResponsiveMyPictures: React.FC = () => {
  return (
    <>
      {/* Mobile + Tablet */}
      <div className="w-full lg:hidden">
        <MyPicturesMobile />
      </div>

      {/* Desktop */}
      <div className="hidden w-full lg:block">
        <MyPicturesDesktop />
      </div>
    </>
  );
};

export default ResponsiveMyPictures;

