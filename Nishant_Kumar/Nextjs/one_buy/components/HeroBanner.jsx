'use client'

import React from 'react'
import poster from '../assets/img/alexander-rotker-l8p1aWZqHvE-unsplash.jpg';
import poster1 from '../assets/img/domino-j7zu2kpTnwY-unsplash.jpg';
import poster2 from '../assets/img/taylor-smith-aDZ5YIuedQg-unsplash.jpg';
import Image from 'next/image';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { FiArrowLeft} from "react-icons/fi";
import { FiArrowRight} from "react-icons/fi";


const HeroBanner = () => {
  return (
    <div className=' rounded-sm  relative w-full max-w-[1360px] mx-auto'>
        <Carousel autoPlay = {true} infiniteLoop = {true} showIndicators = {false} showStatus = {false} 
        renderArrowPrev={(clickHandler , hasPrev)=>(
          <div onClick={clickHandler} className='absolute left-0 h-10 flex items-center cursor-pointer justify-center w-12 md:w-20 md:h-16 top-[100px] md:top-[330px] z-10  bg-black hover:opacity-30'>
            <FiArrowLeft/>
          </div>
        )}  
        showThumbs = {false}
        renderArrowNext={(clickHandler , hasNext)=>(
          <div onClick={clickHandler} className='absolute right-0 h-10 flex items-center cursor-pointer justify-center w-12 md:w-20 md:h-16 top-[100px] md:top-[330px] z-10  bg-black hover:opacity-30'>
            <FiArrowRight/>
          </div>
          
        )}     
        >

                <div className='max-w-[50]'>
                    <Image src={poster} className='aspect-[16/10] md:aspect-auto object-cover max-h-[700px]'/>
                    <div className='absolute top-[170px] md:top-[550px] px-4 md:px-10 py-3 bg-white text-black cursor-pointer md:text-4xl font-bold '>SHOP NOW</div>
                </div> 
                <div>
                    <Image src={poster1} className='aspect-[16/9] md:aspect-auto object-cover max-h-[700px] ' />
                    <div className='absolute top-[170px] md:top-[550px] px-4 md:px-10 py-3 bg-white text-black cursor-pointer md:text-4xl font-bold'>SHOP NOW</div>
                </div> 
                <div>
                    <Image src={poster2} className='aspect-[16/10] md:aspect-auto object-cover max-h-[700px]'/>
                    <div className='absolute top-[170px] md:top-[550px] px-4 md:px-10 py-3 bg-white text-black cursor-pointer md:text-4xl font-bold'>SHOP NOW</div>
                </div> 
            </Carousel>
    </div>
  )
}

export default HeroBanner