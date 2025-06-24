"use client";
import React, { useState } from "react";
import Navigation from "./Navigation";
import { useProfile } from "../../hooks/useProfile";
import { usePathname } from "next/navigation";
import { formatRoute } from "@/app/utils/stringUtils";
import { useRouter } from "next/navigation";
import ColoredText from "../atoms/ColoredText";
import EmberBackground from "../backgrounds/EmberBackground";

const Header = () => {
  const { profile } = useProfile();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <header className="flex flex-col bg-blur w-full justify-evenly">
        <div
          className="flex justify-between"
        >
          {/* Brand */}
          <div
            onClick={() => setSidebarOpen(true)}
            className="font-extrabold text-2xl cursor-pointer hover:opacity-40 p-6 ">
            <ColoredText
              colors={['#000000', '#FFA500', '#FF8C00']}
              size="text-5xl"
              weight="font-extrabold"
              shadow={true}
            >
              Dev
            </ColoredText>
            <ColoredText
              colors={['#FFA500', '#FF8C00', '#000000']}
              size="text-5xl"
              weight="font-extrabold"
              shadow={true}
            >
              Element
            </ColoredText>
          </div>
        </div>
      </header>


      {/* Sidebar */}
      <Navigation isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Header;
