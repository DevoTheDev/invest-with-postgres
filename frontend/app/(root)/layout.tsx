"use client";
import React from 'react'
import Header from '../components/molecules/Header'
import ParticleBackground from '../components/backgrounds/ParticleBackground';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ParticleBackground flakeColor="black" flakeCount={900} direction="down" className="h-full ">
      <Header />
      {children}
    </ParticleBackground>
  )
}

export default layout