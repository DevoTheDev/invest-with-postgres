"use client"
import React from 'react'
import Image from 'next/image'
import TechDisplay from './TechDisplay'

type Props = {}

const HeroCard = (props: Props) => {
  return (
    <div className='h-full flex flex-col justify-evenly'>
      <div className="flex items-center justify-center gap-60">
        <div className="flex flex-col items-center justify-center pt-36 gap-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4 bg-gradient-to-b from-black to-white bg-clip-text text-transparent">
            Devon's Development
          </h1>
          <p className="text-md max-w-md">
            <span className=" bg-gradient-to-b from-white to-black bg-clip-text text-transparent ">
              The is the delivery of all of Devon's developement as a developer. A showcase of all i've learned in the year since I lost my junior-dev position and struggled to get hired because the scope of my limited skillset and lack of degree.
            </span>
          </p>
        </div>
        <div className="w-56 h-138 mb-6 rounded-xl overflow-hidden shadow-lg relative">
          <Image
            src="/personal/Me.png"
            alt="Developer portrait"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className=" flex items-end justify-end pt-18">
          <TechDisplay
            github
            linkedin
            size={70}
            label={false}
          />
        </div>
      </div>
      <div className='flex justify-center' >
        <TechDisplay
          react
          typescript
          express
          tailwind
          postgres
          mui
          docker
          mongodb
          nextjs
          python
          css
          javascript
          centered
          label={false}
        />
      </div>
    </div>

  )
}

export default HeroCard