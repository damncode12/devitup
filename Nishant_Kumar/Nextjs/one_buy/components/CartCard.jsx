'use client'

import React from 'react'
import Image from 'next/image'
import poster from "../assets/img/taylor-smith-aDZ5YIuedQg-unsplash.jpg"
import StarRatings from 'react-star-ratings'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteitem } from '@/store/Cartslice'

const CartCard = ({data}) => {

  const dispatch = useDispatch();

  return (
    <div className='bg-Grey relative md:h-[150px] h-[400px] md:w-[700px] w-[250px] flex-col flex rounded-sm justify-center md:flex-row gap-5'>
        <Image src={data?.attributes?.thumbnail?.data?.attributes?.url} alt='img' className='aspect-[16/10] md:aspect-auto object-cover m-[20px] md:m-2 max-w-[200px]' width={200} height={200} />
        <div className='md:min-w-[455px]'>
        <h3 className='text-bold mt-2 text-start'>{data?.attributes?.name}</h3>
        <div className='text-start  text-white/60'>{data?.attributes?.subtitle}</div>
        <div className='text-start  text-white/60'>Quantity: {data?.quantity}</div>
        <h4 className='text-start  text-bold text-xl'>₹{data?.attributes?.price}</h4>
        <button className=' absolute right-2 bottom-3 px-2 py-2 bg-white rounded-md text-black font-semibold hover:bg-black transition-transform active:scale-105 hover:text-white' onClick={()=>dispatch(deleteitem({id:data?.id}))}>Delete</button>
        </div>
    </div>
  )
}

export default CartCard