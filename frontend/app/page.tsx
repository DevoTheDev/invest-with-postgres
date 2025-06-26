"use client";
import ColoredText from "./components/atoms/ColoredText";
import HeroCard from "./components/atoms/HeroCard";
import MovementCard from "./components/atoms/MovementCard";
import TechDisplay from "./components/TechUsed/TechDisplay";
import BlackSnowBackground from "./components/backgrounds/BlackSnowBackground";
import Header from "./components/molecules/Header";
import SmoothTransition from "./components/sections/SmoothTransition";
import { useExerciser } from "./hooks/useExerciser";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import TechStack from "./components/TechUsed/TechStack";
import MyApps from "./components/presentation/MyApps";
import MyTitlePage from "./components/presentation/MyTitlePage";


export default function Home() {
  const { movements } = useExerciser();
  const router = useRouter();



  return (
    <div>
      <BlackSnowBackground backgroundClassName="bg-gradient-to-b from-white via-gray-100 to-black">
        <SmoothTransition scrollDirection="vertical" >
          <SmoothTransition.Section
            id="section1"
            backgroundColor=""
            textColor="text-white"
          >
            <MyTitlePage />
          </SmoothTransition.Section>
          <SmoothTransition.Section
            id="section2"
            backgroundColor="w-full backdrop-blur-xs"
            textColor="text-white"
          >
            <HeroCard />
          </SmoothTransition.Section>
          <SmoothTransition.Section
            id="section3"
            backgroundColor=""
            textColor="text-white"
          >
              <MyApps />
          </SmoothTransition.Section>
        </SmoothTransition>
      </BlackSnowBackground>
    </div>
  );
}