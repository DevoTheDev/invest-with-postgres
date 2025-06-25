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


export default function Home() {
  const { movements } = useExerciser();
  const router = useRouter();

  type AppLink = {
    title: string;
    description: string;
    onClick?: () => void;
    img?: {
      url?: string;
      alt: string
    };
  }


  const apps: AppLink[] = [
    {
      title: "NextInvestment",
      description:
        "Monitor the market and track your investments as you put your money to work for you in this completely free financial companion application.",
      onClick: () => router.push("/investor"),
      img: {
        url: "/icons/stocks.svg", // stock market / finance icon
        alt: "InvestorApp",
      },
    },
    {
      title: "D-Fitness",
      description:
        "Take control of your fitness and track your transformation with an array of tools designed to streamline the achievement of your health and fitness goals.",
      onClick: () => router.push("/fitness"),
      img: {
        url: "icons/fitness.svg", // dumbbell / fitness icon
        alt: "FitnessApp",
      },
    },
    {
      title: "DevElement",
      description:
        "A showcase website demonstrating Devon's capabilities as a Full-Stack developer, utilizing an array of technologies and designed in accordance with industry best practices.",
      onClick: () => router.push("/"),
      img: {
        alt: "DevelementApp",
        url: "icons/person-icon.svg"
      },
    },
  ];

  const AppCard = (app: AppLink): React.ReactNode => {
    if (app.title === "Develement") return null;

    return (
      <div
        onClick={app.onClick}
        className={`
          border-2 border-white rounded-xl 
          flex justify-between items-center gap-4 p-6
          bg-gray-500/40 hover:bg-gray-500/30 
          transition-all duration-300 transform hover:scale-[1.02] 
          cursor-pointer backdrop-blur-md
        `}
      >
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-white flex">{app.title}</h1>
          <p className="text-white/80 text-sm flex text-left">{app.description}</p>
        </div>
        <div className="w-1/2 flex justify-center items-center bg-transparent bg-clip-content p-4 rounded-xl">
          {app.img?.url && (
            <img
              src={app.img.url}
              alt={app.img.alt}
              width={64}
              height={64}
              className="object-contain"
            />
          )}
        </div>
      </div>
    );
  };


  return (
    <div>
      <BlackSnowBackground backgroundClassName="bg-gradient-to-b from-white via-gray-100 to-black">
        <SmoothTransition scrollDirection="vertical" >
          <SmoothTransition.Section
            id="section1"
            backgroundColor=""
            textColor="text-white"
          >
            <div className="h-lvh items-center flex justify-center" >
              <ColoredText
                colors={['#000000', '#FFFFFF', '#FFFFFF']} // black → dark grey → white
                size="text-5xl"
                weight="font-extrabold"
                shadow={false}
              >
                Dev
              </ColoredText>
              <ColoredText
                colors={['#FFFFFF', '#FFFFFF', '#000000']} // white → light grey → black
                size="text-5xl"
                weight="font-extrabold"
                shadow={true}
              >
                Element
              </ColoredText>
            </div>
          </SmoothTransition.Section>
          <SmoothTransition.Section
            id="section2"
            backgroundColor=""
            textColor="text-black"
          >
            <div className={`
            lg:flex lg:items-center lg:justify-center lg:w-full lg:text-center

            md:grid md:items-center md:justify-center md:w-full md:text-center
            grid  w-full
            
            `}>
            <h2 
            className={`
            lg:bg-gradient-to-t lg:from-black lg:to-white lg:bg-clip-text lg:text-transparent
            lg:text-5xl

            md:bg-gradient-to-b md:from-black md:to-white md:bg-clip-text md:text-transparent
            md:text-5xl

            text-3xl font-bold pb-5
             `}
            >Elegant Design</h2>
            <p 
            className={`
            lg:bg-gradient-to-b lg:from-black lg:to-white lg:bg-clip-text lg:text-transparent
            lg:text-xl

            md:bg-gradient-to-t md:from-black md:to-white md:bg-clip-text md:text-transparent
            md:text-2xl

            text-lg
            `}>
              Crafted with precision, every detail is designed to inspire and delight.
            </p>
            </div>
          </SmoothTransition.Section>
          <SmoothTransition.Section
            id="section3"
            backgroundColor="w-full backdrop-blur-xs"
            textColor="text-white"
          >
            <HeroCard />
          </SmoothTransition.Section>
          <SmoothTransition.Section
            id="section4"
            backgroundColor=""
            textColor="text-white"
          >
            <TechStack />
          </SmoothTransition.Section>
          <SmoothTransition.Section
            id="section5"
            backgroundColor="w-full"
            textColor="text-white"
          >
            <div
              className={`
              w-full max-w-4xl mx-auto p-6 md:p-8 h-lvh
              rounded-2xl
              text-white gap-12 flex flex-col justify-evenly items-center
              `}
            >
              <div className="flex flex-col gap-6" >
                {apps.map((a, i) => (
                  <AppCard {...a} key={i} />
                ))}
              </div>
              <TechDisplay github linkedin gmail centered label={false} />
            </div>
          </SmoothTransition.Section>
        </SmoothTransition>
      </BlackSnowBackground>
    </div>
  );
}