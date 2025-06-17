"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import { Spinner } from "../atoms/Spinner";
import Customs from "../organisms/Customs";
import TechDisplay from "../atoms/TechDisplay";
import HeroCard from "../atoms/HeroCard";
import AppDeck from "../atoms/AppDeck";
import { useProfile } from "@/app/hooks/useProfile";

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#000000] via-[#151923] to-[#6c6c7f] text-white">
      {/* Header */}
      <header className="w-full px-18 pt-8 flex justify-between items-center">
        <div>
          <Customs.Text textSize="text-2xl" colors={["#000000", "#000000", "#026666", "#45fed5", "#45fed5"]}>
            DEV
          </Customs.Text>
          <Customs.Text textSize="text-2xl" colors={["#ffffff", "#ffffff", "#222222", "#222222"]}>
            ELEMENT
          </Customs.Text>
        </div>
        
        {!user ? <button
          onClick={() => router.push("/pages/sign-in")}
          className="bg-white/10 hover:bg-white/20 transition-colors duration-200 text-white px-6 py-2 rounded-lg flex items-center gap-2"
        >
          Sign In
        </button> :
        <div className="bg-white/20 font-bold hover:bg-white/40 px-4 py-2 rounded-md cursor-pointer" onClick={() => router.push("/settings")}>
          Welcome Back 
          <Customs.Text 
          leftSpace
          >
          {profile?.name || user.email}!
          </Customs.Text>
        </div>
        }
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-evenly gap-12 py-12">
        <HeroCard />
        <AppDeck />
      </main>

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

      {/* Footer */}
      <footer className="w-full py-8 flex justify-center items-center text-center">
        &copy; {new Date().getFullYear()} DEVELEMENT. All rights reserved. (hehe)
      </footer>
    </div>
  );

};

export default WelcomePage;
