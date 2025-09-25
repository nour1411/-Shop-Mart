"use client"

import { Carousel, CarouselContent, CarouselItem} from '@/components/ui/carousel';

import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

import React from 'react'

export default function ProductSlider({images,title}:{images:string[],title:string}) {
  return <>
  
        <Carousel
            opts={{
    loop: true,
  }}
   plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
  >
  <CarouselContent>
      {images.map((image,index)=> <CarouselItem key={index}> 
      <Image src={image} className='w-full' 
           alt={title} width={300} height={300}/>
           </CarouselItem>
)}
  </CarouselContent>
  {/* <CarouselPrevious />
  <CarouselNext /> */}
</Carousel>
            
  
  </>
}

