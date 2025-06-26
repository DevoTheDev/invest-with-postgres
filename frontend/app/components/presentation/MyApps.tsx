"use client";
import { useRouter } from 'next/navigation';
import React from 'react'
import TechDisplay from '../TechUsed/TechDisplay';

type Props = {}

type AppLink = {
    title: string;
    description: string;
    onClick?: () => void;
    img?: {
        url?: string;
        alt: string
    };
}

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


const MyApps = (props: Props) => {
    const router = useRouter();


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

    return (
        <div className='flex flex-col justify-between h-3/4 w-1/2'>
            <div className="flex flex-col gap-6" >
                {apps.map((a, i) => (
                    <AppCard {...a} key={i} />
                ))}
            </div>
            <div className='flex justify-center'> 
            <TechDisplay github linkedin gmail label={false} gap='gap-6' />
            </div>
        </div>
    )
}

export default MyApps