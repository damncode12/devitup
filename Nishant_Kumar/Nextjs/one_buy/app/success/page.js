import React from 'react'
import Wrapper from '@/components/Wrapper'
import Link from 'next/dist/client/link'

const page = () => {
  return (
    <Wrapper>
        <div className='flex justify-center content-center h-screen'>
            <div className='flex flex-col px-[70px] justify-center text-center border-2 rounded-sm w-[500px] h-[200px] mt-[300px]'>
                <h1 className='text-2xl font-semibold'>Thank you for Shopping</h1>
                <div>Your Payment was Sucessfull</div>
                <Link href='/' className=' py-2 bg-white mt-4 rounded-lg text-black font-semibold hover:text-white hover:bg-Grey transition-transform active:scale-105'>Continue Shopping</Link>
            </div>
        </div>
    </Wrapper>
  )
}

export default page