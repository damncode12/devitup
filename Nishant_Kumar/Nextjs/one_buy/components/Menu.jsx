'use client';

import React from 'react'
import Link from 'next/link'
import { FiChevronDown } from "react-icons/fi";
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchdata } from '@/utils/api';





//https://www.instagram.com/reels/CqZLbShvA9z/

const data = [
    { id: 1 , name : "Home" , url : '/'},
    { id: 2 , name : "About" , url : '/about'},
    { id: 3 , name : "Categories" , submenu : true},
    { id: 4 , name : "Contact" , url : '/contact'}
]

// const submenu = [
//     {id : 1 , name : "Lenovo" , count : 2 , url : '/category/Lenovo'},
//     {id : 2 , name : "HP" , count : 10 , url : '/category/Proffesional'},
//     {id : 3 , name : "ASUS" , count : 1 , url : '/category/Lowend'},
// ]


const Menu = ({showcatMenu , setshowcatMenu}) => {
    // const router = useRouter();
    const [category, setcategory] = useState(null)
    useEffect(()=>{
      fetchprod();
    },[])
  
    const fetchprod = async()=>{
      const {data} = await fetchdata(`/api/categories?populate=*`)
      console.log(data);
      setcategory(data);
    }


    // const setcatdata = (data , slug)=>{
    //     setcata(data);
    //     router.push(`/category/${slug}`)
    // }

  return (
    <ul className='hidden md:flex items-center gap-8 font-medium text-white'>
        {data.map((item)=>{
            return(
                <React.Fragment key={item?.id}>
                    {(item.submenu) ? <li className='cursor-pointer flex  items-center gap-2 relative' 
                        onMouseEnter={()=>setshowcatMenu(true)}
                        onMouseLeave={()=>setshowcatMenu(false)}>
                        {item.name}
                        <FiChevronDown/>
                        {showcatMenu && (<ul className='bg-white absolute top-6 left-0 min-w-[250px] px-1 shadow-lg rounded-sm'>
                            {category?.map((cat)=>{
                                return (
                                    <Link href={`/category/${cat?.attributes?.slug}`} key={cat.id}>
                                        <li className='h-12 flex text-black justify-between item-center px-3 py-2 hover:bg-black/[0.03] rounded-md'>
                                        {cat?.attributes?.name}
                                        <span className='opacity-50 text-sm'>{cat?.attributes?.products?.data.length}</span>
                                        </li>
                                    </Link>
                                )
                            })}
                        </ul>)}
                    </li>
                    : (
                        <Link href={item?.url}>
                        <li className= "cursor-pointer">{item?.name}</li>
                        </Link>
                    )}
                </React.Fragment>
            )
        })}
    </ul>
  )
}

export default Menu