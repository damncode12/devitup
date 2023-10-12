import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";
import { useState } from "react";
import { fetchdata } from "@/utils/api";
import { useEffect } from "react";
import { useParams } from 'next/navigation';
import sample from "../assets/img/taylor-smith-aDZ5YIuedQg-unsplash.jpg"


const MultiCrousel = () => {

  const params = useParams();
  const {slug} = params;

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const [cate, setcate] = useState(null)

  useEffect(()=>{
    fetchcatdata();
  },[])

  const fetchcatdata = async()=>{
    const res = await fetchdata(`/api/products?populate=*&[filters][category][slug][$eqi]=${slug}`);
    setcate(res?.data)
    console.log(res)
  }

  return (
      <>
      {
        cate && (
          <Carousel responsive={responsive} autoPlay ={true} itemClass="mx-2 rounded-sm">
      {
        (cate?.map((item)=>{
          return(
            <ProductCard Title={item?.attributes?.name} slug={item?.attributes?.slug} imgurl={item?.attributes?.thumbnail?.data?.attributes?.url} Price={item?.attributes?.price} id={slug}/>
          )
        }))
      }
      </Carousel>
        )
      }
      
      </>
  );
};

export default MultiCrousel;
