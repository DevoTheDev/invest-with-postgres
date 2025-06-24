"use client";
import ColoredText from "./components/atoms/ColoredText";
import HeroCard from "./components/atoms/HeroCard";
import MovementCard from "./components/atoms/MovementCard";
import BlackSnowBackground from "./components/backgrounds/BlackSnowBackground";
import Header from "./components/molecules/Header";
import SmoothTransition from "./components/sections/SmoothTransition";
import { useExerciser } from "./hooks/useExerciser";
import { useRouter } from "next/navigation";

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
          bg-gray-500/60 hover:bg-gray-500/30 
          transition-all duration-300 transform hover:scale-[1.02] 
          cursor-pointer
        `}
      >
        <div className="w-2/3 space-y-2">
          <h1 className="text-2xl font-semibold text-white">{app.title}</h1>
          <p className="text-white/80 text-sm">{app.description}</p>
        </div>
        <div className="w-1/3 flex justify-end">
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
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Elegant Design</h2>
            <p className="text-lg md:text-xl">
              Crafted with precision, every detail is designed to inspire and delight.
            </p>
          </SmoothTransition.Section>
          <SmoothTransition.Section
            id="section3"
            backgroundColor="w-full"
            textColor="text-white"
          >
            <div className={`m-12
            w-full rounded-xl 
            flex justify-center items-center h-full
            border-white border-2 backdrop-blur-sm
            `}>
              <HeroCard />
            </div>
          </SmoothTransition.Section>
          <SmoothTransition.Section
            id="section5"
            backgroundColor="w-full"
            textColor="text-white"
          >
            <div
              className={`
    w-full max-w-4xl mx-auto p-6 md:p-8 h-lvh
    rounded-2xl border border-white/10
    backdrop-blur-md text-white flex flex-col gap-6 shadow-xl
  `}
            >
              {apps.map((a, i) => (
                <AppCard {...a} key={i} />
              ))}
            </div>

          </SmoothTransition.Section>
        </SmoothTransition>
      </BlackSnowBackground>
    </div>
  );
}
