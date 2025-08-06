"use client";
import React from 'react'
import Header from '../components/molecules/Header'
import ParticleBackground from '../components/backgrounds/ParticleBackground';
import BlackSnowBackground from '../components/backgrounds/BlackSnowBackground';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default layout