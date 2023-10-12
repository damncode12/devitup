import React from 'react'
import Image from 'next/image'
import cardposter from '../assets/img/andras-vas-Bd7gNnWJBkU-unsplash.jpg'
import Link from 'next/link'

const ProductCard = ({Title, Price , imgurl , slug,id}) => {

  const name = slug;

  return (
    <Link href={`/productdetail/${id}/${name}`} className='transform overflow-hidden hover:scale-105  duration-200'>
        <div className='cursor-pointer  md:h-[250px] w-200px h-200px rounded-sm  aspect-[16/10] md:aspect-auto object-cover max-h-[250px] md:max-h-[500px]'>
        <Image src={imgurl} alt='custom' sizes="(max-width: 768px)" fill className=' cursor-pointer  rounded-sm  aspect-[16/10] md:aspect-auto object-cover max-h-[250px] '/>
        </div>
        <div className='p-4 bg-black text-white'>
            <h2 className='text-lg'>{Title}</h2>
            <h3 className='opacity-30 font-semibold text-xl '>₹{Price}</h3>
        </div>
    </Link>
  )
}
export default ProductCard