"use client";
import React, { useState } from "react";
import Navigation from "./Navigation";
import { useProfile } from "../../hooks/useProfile";
import { useRouter } from "next/navigation";
import ColoredText from "../atoms/ColoredText";
import EmberBackground from "../backgrounds/EmberBackground";

const Header = () => {
  const { profile } = useProfile();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
        <header className="flex flex-col w-full bg-black backdrop-blur-md border-b border-white/10 shadow-sm">
          <div className="flex justify-between items-center p-8">
            {/* Brand */}
            <div
              onClick={() => setSidebarOpen(true)}
              className="cursor-pointer transition-opacity duration-200 hover:opacity-60"
            >
              <ColoredText
                colors={['#000000', '#333333', '#ffffff']}
                size="text-3xl md:text-4xl"
                weight="font-extrabold"
                shadow={false}
              >
                Dev
              </ColoredText>
              <ColoredText
                colors={['#ffffff', '#333333', '#000000']}
                size="text-3xl md:text-4xl"
                weight="font-extrabold"
                shadow={false}
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
