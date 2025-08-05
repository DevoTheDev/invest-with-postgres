"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Navigation from "../Navigation/Navigation";
import { useProfile } from "../../hooks/useProfile";
import ColoredText from "../atoms/ColoredText";
import BlackSnowBackground from "../backgrounds/BlackSnowBackground";
import ReactiveText from "../atoms/ReactiveText";
import { useInvestor } from "@/app/hooks/useInvestor";
import { useExerciser } from "@/app/hooks/useExerciser";
import { formatHeader } from "@/app/utils/stringUtils";

const Header = () => {
  const { profile } = useProfile();
  const { investor } = useInvestor();
  const { exerciser } = useExerciser();
  const [isSidebarOpen, setSidebarOpen] = useState(false);


  const Heading = () => {
    const pathname = usePathname();
    const investorPage: boolean = pathname ? pathname.includes("/investor") || pathname.includes("/market") : false;
    const exerciserPage: boolean = pathname ? pathname.includes("/fitness") || pathname.includes("/programs") : false;


    return (
      <div className="flex flex-col items-end" >
        <div className="text-black">Welcome back, {profile?.name}!</div>
        {investorPage ?
          <div className="font-thin text-black/80 flex gap-2">Investment Budget:
            <div className="font-bold">
            ${investor?.annual_investment_budget}
            </div>
          </div>
          : null}
        {exerciserPage ?
          <div className="font-thin text-black/80 flex">Training:
            <div>
              {formatHeader(exerciser?.training_emphasis || "")}
            </div>
          </div>
          : null}
      </div>
    )
  }

  return (
    <>
      <header className="flex flex-col w-full p-8">
        <div className="flex justify-between items-center">
          {/* Brand */}
          <div
            onClick={() => setSidebarOpen(true)}
            className="cursor-pointer transition-transform duration-500 hover:scale-[1.08]"
          >
            <ReactiveText
              text="DevElement"
              flashlightSize="40px"
              containerClass="w-full max-w-2xl mx-auto"
              textClass="text-white"
              colors={["#000000", "#333333", "#FFFFFF"]}
              size="text-3xl"
              weight="font-extrabold"
              shadow={false}
            />
          </div>
          {Heading()}
        </div>
      </header>
      {/* Sidebar */}
      <Navigation isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

    </>
  );
};

export default Header;
