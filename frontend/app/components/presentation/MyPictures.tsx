import React from 'react'
import Image from "next/image";

type Props = {}

const MyPictures = (props: Props) => {
  return (
    <div className={`
    flex-1 flex justify-center items-center
    relative  w-full h-full
    `}>
          <div className={`
          lg:absolute lg:bottom-20 right-60
          md:absolute md:bottom-20
          `}>
            <div className={`
            relative 
            lg:w-44 lg:h-60
            md:w-24 md:h-64
            rounded-xl overflow-hidden shadow-xl
            `}>
              <Image
                src="/personal/Me.png"
                alt="Developer portrait"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          <div className={`
          lg:absolute lg:top-20 left-60
          md:absolute md:top-40
          `}>
            <div className={`
            relative 
            lg:w-44 lg:h-60
            md:w-24 md:h-64
            rounded-xl overflow-hidden shadow-xl
            `}>
              <Image
                src="/personal/meBW.JPG"
                alt="Developer portrait black and white"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
  )
}

export default MyPictures