'use client'

import React from 'react'
import { useState} from 'react';
import { useEffect } from 'react';
import Wrapper from './Wrapper';
import Image from 'next/image';
import logo from '../assets/img/logo-no-background.png'
import Link from 'next/link';
import Menu from './Menu';
import { FiSearch } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import MobileMenu from './MobileMenu';




const Navbar = () => {

    const [mobileMenu, setmobileMenu] = useState(false)
    const [showcatMenu, setshowcatMenu] = useState(false)
    const [show, setshow] = useState("translate-y-0")

  return (
    <div className={`w-full h-[50px] md:h-[80px] bg-black flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}>
        <Wrapper classname={`flex justify-between`}>
        <Link href="/">
        <Image src={logo} alt='logo' width={110}></Image>
        </Link>
        <Menu showcatMenu = {showcatMenu} setshowcatMenu = {setshowcatMenu}/>
        <div className='flex items-center gap-3 md:gap-8'>
        <Link href = "#"><FiSearch height={400}/></Link>
        <Link href = "/cart"><FiShoppingCart height={400}/></Link>
        <MobileMenu mobileMenu = {mobileMenu} setmobileMenu = {setmobileMenu} setshowcatMenu = {setshowcatMenu} showcatMenu = {showcatMenu}/>
        </div>
        </Wrapper>
    </div>
  )
}

export default Navbar