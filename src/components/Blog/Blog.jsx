import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GET_BLOGS } from '../../apollo/Apollo'
import { FaRegHeart } from "react-icons/fa";
import { IoMdChatboxes } from "react-icons/io";
import { FaShareAlt } from "react-icons/fa";
export const Blog = ({BlogRef}) => {
  const[blog,setBlog]=useState([])
  const{data,loading,error}=useQuery(GET_BLOGS,{
    variables:{
      filter:{
        shopId:348
      }
    }
  })
 useEffect(()=>{
  if(data){
    setBlog(data.Blog)
  }

 },[])
  return (
    <div ref={BlogRef} className='w-full'>
      <p className='text-4xl text-center border py-2 font-bold  border-[#23b923]'>OUR BLOGS</p>
 <div className='grid  py-4 place-items-center'>

        <div className='flex md:w-1/2 border py-10 px-10 flex-col gap-7 '>
        <div className='flex justify-between '>
          <img src="" alt="" />
         <div className='flex gap-3 flex-1'>
         <p className='text-xl'>Our blog: </p>
         <p className='text-xl'>Empty</p>
         </div>
        </div>
        <div className='flex justify-between gap-10 md:gap-0 items-center md:text-xl'>
          <p>jun25,2022</p>
          <p><FaRegHeart />(0)</p>
          <p><IoMdChatboxes />(0)</p>
          <p><FaShareAlt />(0)</p>
        </div>
           </div>

 </div>
    </div>
  )
}
