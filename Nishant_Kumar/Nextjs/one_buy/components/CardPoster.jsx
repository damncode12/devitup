"use client";

import React from "react";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { FiArrowLeft } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";


const HeroBanner = ({data}) => {
  return (
    <div className=" rounded-sm  relative w-[400px] md:w-[500px] mx-auto">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <div
            onClick={clickHandler}
            className="absolute ml-2 left-0 h-8 flex items-center cursor-pointer justify-center w-8 md:w-12 md:h-12 top-[110px] md:top-[100px] z-10  bg-black hover:opacity-30 rounded-full"
          >
            <FiArrowLeft />
          </div>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <div
            onClick={clickHandler}
            className="absolute right-0 h-8 mr-2 flex items-center cursor-pointer justify-center w-8 md:w-12 md:h-12 top-[110px] md:top-[100px] z-10  bg-black hover:opacity-30 rounded-full"
          >
            <FiArrowRight />
          </div>
        )}
        renderThumbs={() =>
          data?.map((item) => (
            <Image
              src={item?.attributes?.url}
              className="aspect-[16/10] md:aspect-auto object-cover max-h-[100px]"
              width={80}
              height={80}
              alt={`thumb`}
              key={item.id}
            />
          ))
        }
      >
        
          {data?.map((item)=>{
            return(
              <div className="max-w-[50]">
              <Image
            src={item?.attributes?.url}
            className="aspect-[16/10] md:aspect-auto object-cover max-h-[300px] rounded-sm"
            width={500}
              height={500}
            alt="image"
          />
          </div>
            )
          })}
      </Carousel>
    </div>
  );
};

export default HeroBanner;
