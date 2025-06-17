"use client"
import React from 'react'
import Customs from '../organisms/Customs'
import Image from 'next/image'
import TechDisplay from './TechDisplay'

type Props = {}

const HeroCard = (props: Props) => {
  return (
    <>
      {/* Left: Portrait + Title */}
      <div className="flex flex-col items-start text-center md:text-left">
        <div className="w-48 h-72 relative mb-6 rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/personal/Me.png"
            alt="Developer portrait"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className='flex pl-7 w-full' >

          <TechDisplay 
          github
          linkedin
          size={30}
          label={false}
          />
          </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
          <Customs.Text textSize="text-5xl md:text-6xl" colors={["#45fed5", "#646def", "#f93745"]}>
            Develop like Devon
          </Customs.Text>
        </h1>
        <p className="text-white/70 text-md max-w-md">
          <Customs.Text textSize="" colors={["#f93745", "#646def", "#45fed5",]} rightSpace>
            DevElement
          </Customs.Text>
          is the delivery of all of Devon's developement as a developer. A showcase of all i've learned in the year since I lost my junior-dev position and struggled to get hired because the scope of my limited skillset and lack of degree.
        </p>
      </div>
    </>
  )
}

export default HeroCard