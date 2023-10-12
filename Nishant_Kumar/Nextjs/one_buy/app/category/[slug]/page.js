"use client"

import React, { useEffect } from 'react'
import { useParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import Wrapper from '@/components/Wrapper';
import { fetchdata } from '@/utils/api';
import { useState } from 'react';


const Category = () => {
  const params = useParams();
  const {slug} = params;
  const [cate, setcate] = useState(null)

  useEffect(()=>{
    fetchcatdata();
    console.log(cate)
  },[])

  const fetchcatdata = async()=>{
    const res = await fetchdata(`/api/products?populate=*&[filters][category][slug][$eqi]=${slug}`);
    setcate(res?.data)
  }
  return (
    <Wrapper>
    <h1 className='text-4xl text-center mt-10'>{slug}</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 mt-10 mb-5 lg:grid-cols-3 gap-4 px-5">
      {
        cate?.map((item)=>{
          return(
            <ProductCard Title={item?.attributes?.name} slug={item?.attributes?.slug} imgurl={item?.attributes?.thumbnail?.data?.attributes?.url} Price={item?.attributes?.price} id = {slug}/>
          )
        })
      }
    </div>
    </Wrapper>
  )
}
export default Category 