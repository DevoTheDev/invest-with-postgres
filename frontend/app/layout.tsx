import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from './contexts/AuthContext';
import { ProfileProvider } from "./contexts/ProfileContext";
import { MarketProvider } from "./contexts/MarketContext";
import { InvestorProvider } from "./contexts/InvestorContext";
import { ExerciserProvider } from "./contexts/ExerciserContext";
import ReactQueryProvider from "./contexts/ReactQueryContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevElement",
  description: "Devon's web-development showcase application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
            <AuthProvider>
              <ProfileProvider>
                <InvestorProvider>
                  <ExerciserProvider>
                    <MarketProvider>
                      {children}
                    </MarketProvider>
                  </ExerciserProvider>
                </InvestorProvider>
              </ProfileProvider>
            </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
