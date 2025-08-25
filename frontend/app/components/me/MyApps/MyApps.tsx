"use client";
import { useRouter } from 'next/navigation';
import React from 'react'
import TechDisplay from '../TechUsed/TechDisplay';
import { useAuth } from '@/app/hooks/useAuth';
import './MyApps.css';

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
        <div onClick={app.onClick} className="app-card">
            <div className="app-card-text">
                <h1 className="app-card-title">{app.title}</h1>
                <p className="app-card-description">{app.description}</p>
            </div>
            <div className="app-card-image">
                {app.img?.url && (
                    <img
                        src={app.img.url}
                        alt={app.img.alt}
                        width={64}
                        height={64}
                    />
                )}
            </div>
        </div>
    );
};

const MyApps = (props: Props) => {
    const router = useRouter();
    const { user } = useAuth();

    const userCheck = (landing: string) => {
        if (user) {
            return router.push(landing)
        } else {
            router.push("/pages/sign-in")
        }
    }

    const apps: AppLink[] = [
        {
            title: "NextInvestment",
            description:
                "Monitor the market and track your investments as you put your money to work for you in this completely free financial companion application.",
            onClick: () => userCheck("/investor"),
            img: {
                url: "/icons/stocks.svg",
                alt: "InvestorApp",
            },
        },
        {
            title: "D-Fitness",
            description:
                "Take control of your fitness and track your transformation with an array of tools designed to streamline the achievement of your health and fitness goals.",
            onClick: () => userCheck("/fitness"),
            img: {
                url: "icons/fitness.svg",
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
        <div className="myapps-container">
            <div className="myapps-card-list">
                {apps.map((a, i) => (
                    <AppCard {...a} key={i} />
                ))}
            </div>
            <div className="myapps-footer">
                <TechDisplay github linkedin gmail label={false} size={56} centered />
            </div>
        </div>
    )
}

export default MyApps;
