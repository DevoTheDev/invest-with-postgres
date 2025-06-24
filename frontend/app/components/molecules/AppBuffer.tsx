"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import { Spinner } from "../atoms/Spinner";
import TechDisplay from "../atoms/TechDisplay";
import HeroCard from "../atoms/HeroCard";
import { useProfile } from "@/app/hooks/useProfile";
import Header from "./Header";

const WelcomePage = () => {
  const router = useRouter();
  const { authLoading, user } = useAuth();
  const { profile } = useProfile();

  if (authLoading)
    return (
      <div className="flex items-center justify-center h-screen bg-black/60">
        <Spinner type="ring" color="#45fed5" size={60} />
      </div>
    );

  return (
    <div className={`
    min-h-screen flex flex-col justify-between w-full`}>
      <Header />
      {/* Hero Section */}
      <main className="flex justify-between flex-col mx-12">
        <HeroCard />
      </main>

      <div>
        <TechDisplay
          postgres
          react
          typescript
          mui
          express
          docker
          label={false}
          size={60}
          centered
        />
      </div>

      {/* Footer */}
      <footer className="w-full py-8 flex justify-center items-center text-center">
        &copy; {new Date().getFullYear()} DEVELEMENT. All rights reserved. (hehe)
      </footer>
    </div>
  );

};

export default WelcomePage;
