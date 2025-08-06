"use client";
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/app/components/shadcn/ui/carousel';

type FlexibleCarouselProps = {
  sections: React.ReactNode[];
}

const FlexibleCarousel = (props: FlexibleCarouselProps) => {
  return (
    <div className='flex bg-gray-300 rounded-xl' >
    <Carousel className="w-full">
      <CarouselContent className="-ml-1">
            {props.sections.map((s, index) => 
          <CarouselItem key={index} className="pl-1 flex justify-center items-center w-full">
            {s}
          </CarouselItem>
            )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
  )
}

export default FlexibleCarousel