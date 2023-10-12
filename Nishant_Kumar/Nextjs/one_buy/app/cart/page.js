'use client'

import React, { useEffect } from 'react'
import Wrapper from '@/components/Wrapper'
import Image from 'next/image'
import CartCard from '@/components/CartCard'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import cartimg from "../../assets/img/cart.png"
import Link from 'next/dist/client/link'
import {loadStripe} from '@stripe/stripe-js';
import { makepaymentreq } from '@/utils/api'
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


const cart = () => {
  const [loading, setloading] = useState(false)

  const {cartItem} = useSelector((state)=>state.cart);

  const [totalprice, settotalprice] = useState(0)
  let t = 0 ;

  useEffect(()=>{
      cartItem.map((data)=>{
          t = t + data?.attributes?.price ;
      })
      settotalprice(t);
  })

  const handlepayment=async()=>{
    try {
      setloading(true)
      const stripe  = await stripePromise;
      const res  = await makepaymentreq("/api/orders", {
        products : cartItem
      })
      await stripe.redirectToCheckout({
        sessionId: res.stripeSession.id
      })
    } catch (error) {
      setloading(false)
      console.log(error)
    }
  }

  return (
    <Wrapper>
      {cartItem.length > 0 &&
        (
        <div className='text-center min-h-screen'>
        <h1 className='text-4xl text-center mt-10'>Shopping Cart</h1>
        <div className='md:flex md:flex-row mx-[100px]  gap-8 flex flex-col justify-center mt-10 mb-10'>
        <div className='flex flex-col gap-8'>
        {
          cartItem.map((item)=>(
            <CartCard key={item?.id} data = {item}/>
          ))
        }
        </div>
        <div>
        <h2 className='font-medium text-xl mb-8'>Summary</h2>
        <div className='bg-Grey md:h-[200px] md:w-[350px] w-auto h-[250px]  rounded-md p-4'>
            <h3 className='text-start font-medium mb-2'>SubTotal : ₹ {totalprice}</h3>
            <hr />
            <div className='text-start mt-2'>This Tells you about total Expenses you would cost after buying the products present in your cart and also Never doubt our calculations</div>
        </div>
        <button className='px-10 py-2 bg-white mt-4 rounded-lg text-black font-semibold hover:text-white hover:bg-Grey transition-transform active:scale-105' onClick={handlepayment}>Check Out
        {
          loading && <h1>Loading...</h1>
        }
        </button>
        </div>
        </div>
        </div>)
        }
        {
          cartItem.length < 1 &&
          
          (<div className='min-h-screen flex justify-center content-center'>
            <div className='flex flex-col  h-[300px] w-[250px] justify-center item-center '>
          <Image src={cartimg} alt='img' className=' aspect-[16/10] md:aspect-auto object-cover mt-[300px] ml-[25px] rounded-lg md:ml-[25px] md:mt-[300px] max-w-[200px]' width={200} height={200} />
          <Link href="/" className='px-10 py-2 bg-white mt-4 rounded-lg text-black font-semibold hover:text-white hover:bg-Grey transition-transform active:scale-105'>Continue Shopping</Link>
          </div>
          </div>)
        }


    {/* Empty Cart Page  */}

    
        
    </Wrapper>
  )
}

export default cart