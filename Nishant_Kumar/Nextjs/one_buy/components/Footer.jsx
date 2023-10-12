import React from 'react'
import { FiLinkedin } from "react-icons/fi";
import { FiGithub } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";
const Footer = () => {
  return (
    <div className='w-full bg-white flex justify-between '>
      <span className='text-black font-bold p-2'>Created by Nishant Kumar</span>
      <div>
        <ul className='flex text-black p-2 px-4 gap-5 text-2xl'>
          <a href="https://www.linkedin.com/in/nishant-kumar-b198b822b/" target='_blank'><li><FiLinkedin /></li></a>
          <a href="#" target='_blank'><li><FiGithub /></li></a>
          <a href="#" target='_blank'><li><FiInstagram /></li></a>
        </ul>
      </div>
    </div>
  )
}

export default Footer