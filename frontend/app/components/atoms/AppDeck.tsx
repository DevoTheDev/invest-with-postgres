"use client";
import React from 'react'
import { useRouter } from 'next/navigation';

type Props = {}

const AppDeck = (props: Props) => {
    const router = useRouter();

    return (
        <div>
            {/* Right: App Cards */}
            <div className="flex flex-col gap-8">
                {/* Investment App Card */}
                <div 
                className="group bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 p-6 rounded-xl shadow-md transform transition-transform duration-500 hover:scale-105 w-2/3 self-center cursor-pointer hover:from-blue-500 hover:via-cyan-600 hover:to-green-500"
                onClick={() => router.push("/investor")}
                >
                    <h2 className="text-2xl font-semibold mb-2">Investment App</h2>
                    <p className="text-white/80 mb-4">
                        Analyze stocks, visualize portfolios, and simulate strategic investments with real-time insights.
                    </p>
                </div>

                {/* Fitness Tracker Card */}
                <div 
                className="group bg-gradient-to-br from-red-700 via-orange-600 to-orange-700 p-6 rounded-xl shadow-md transform transition-transform duration-500 hover:scale-105 w-2/3 self-center cursor-pointer hover:from-orange-500 hover:via-pink-500 hover:to-purple-600"
                onClick={() => router.push("/fitness")}
                >
                    <h2 className="text-2xl font-semibold mb-2">Fitness Tracker</h2>
                    <p className="text-white/80 mb-4">
                        Track your workouts, measure progress, and reach personal goals with this focused fitness assistant.
                    </p>
                </div>
            </div>
        </div>

    )
}

export default AppDeck