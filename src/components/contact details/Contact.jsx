import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa6";
import { MdOutlinePhone } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
export const Contact = () => {
  return (
    <div className='w-screen hidden md:flex justify-between px-32 py-3'>
  <div className='flex gap-10'>
    <p className='flex items-center gap-3'><MdOutlinePhone /> +012 345 678 102</p>
    <p className='flex items-center gap-3'><IoMdMail /> info@example.com</p>
  </div>
  <div>
    <ul className='flex gap-7'>
      <li><FaFacebookF /></li>
      <li><FaTwitter /></li>
      <li><TbWorld /></li>
      <li><FaInstagram /></li>
      <li><FaPinterestP /></li>
    </ul>
  </div>
    </div>
  )
}
