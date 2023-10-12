import Link from 'next/link';
import React from 'react'
import { FiAlignJustify } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { fetchdata } from '@/utils/api';
import { useState } from 'react';
import { useEffect } from 'react';

const data = [
    { id: 1 , name : "Home" , url : '/'},
    { id: 2 , name : "About" , url : '/about'},
    { id: 3 , name : "Categories" , url : '/categories' , submenu : true},
    { id: 4 , name : "Contact" , url : '/contact'}

]
// const submenu = [
//     {id : 1 , name : "Gaming" , count : 2 , url : '/category/Gaming'},
//     {id : 2 , name : "Proffesional " , count : 10 , url : '/category/Proffesional'},
//     {id : 3 , name : "Low-End" , count : 1 , url : '/category/Lowend'},
// ]

const MobileMenu = ({setmobileMenu,mobileMenu , setshowcatMenu , showcatMenu }) => {

    const [category, setcategory] = useState(null)
    useEffect(()=>{
      fetchprod();
    },[])
  
    const fetchprod = async()=>{
      const {data} = await fetchdata(`/api/categories?populate=*`)
      console.log(data);
      setcategory(data);
    }

  return (
    <div className='md:hidden'>
    <div onClick={()=>setmobileMenu(!mobileMenu)} className='transition-all cursor-pointer'>{(!mobileMenu)?<FiAlignJustify/>:<FiX/>}</div>
    {mobileMenu && (<ul className='bg-white absolute top-9 right-6 min-w-[100px] px-1 shadow-lg rounded-sm'>
    {data.map((item)=>{
            return(
                <React.Fragment key={item?.id}>
                    {(item.submenu) ? <li className='cursor-pointer flex  items-center  relative text-black' 
                        onMouseEnter={()=>setshowcatMenu(true)}
                        onMouseLeave={()=>setshowcatMenu(false)}>
                        {item.name}
                        <FiChevronDown/>
                        {showcatMenu && (<ul className='bg-white absolute top-6 left-0 min-w-[50px] pr-1 shadow-lg rounded-sm'>
                            {category.map((cat)=>{
                                return (
                                    <Link href={`/category/${cat?.attributes?.slug}`} key={cat.id}>
                                        <li className='h-7 flex text-black justify-between item-center px-3 hover:bg-black/[0.03] rounded-md'>
                                        {cat?.attributes?.name}
                                        <span className='opacity-50 text-sm px-2'>{cat?.attributes?.products?.data.length}</span>
                                        </li>
                                    </Link>
                                )
                            })}
                        </ul>)}
                    </li>
                    : (
                        <Link href={item?.url} onClick={()=>setmobileMenu(false)}>
                        <li className= "cursor-pointer text-black font-medium text-sm">{item?.name}</li>
                        </Link>
                    )}
                </React.Fragment>
            )
        })}
    </ul>)}
    </div>
  )
}

export default MobileMenu