"use client";
import React, { useState } from "react";
import Navigation from "./Navigation";
import { useProfile } from "../../hooks/useProfile";
import { usePathname } from "next/navigation";
import { formatRoute } from "@/app/utils/stringUtils";
import { useRouter } from "next/navigation";

const Header = () => {
  const { profile } = useProfile();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter(); 

  return (
    <>
      <header className="flex flex-col justify-evenly p-4 bg-gray-200">
        <div
          className="flex justify-between p-4"
        >
          {/* Brand */}
          <div
            onClick={() => setSidebarOpen(true)}
            className="font-extrabold text-2xl cursor-pointer hover:opacity-40">
            <span className="text-blue-600">
              Dev
            </span>
            <span className="text-black">
              Element
            </span>
          </div>

          {/* Welcome Message */}
          <div 
          className="text-center items-center font-bold"
          onClick={() => router.push("/settings")}
          >
            Welcome, <span className="">{profile?.name || "User"}</span>
          </div>

        </div>
      </header>
      <div className="flex bg-gray-100 p-2 justify-center font-bold" >
        {formatRoute(pathname)}
      </div>


      {/* Sidebar */}
      <Navigation isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Header;
