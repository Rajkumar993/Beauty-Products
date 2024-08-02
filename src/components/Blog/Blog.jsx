import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GET_BLOGS } from '../../apollo/Apollo'
import { FaRegHeart } from "react-icons/fa";
import { IoMdChatboxes } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaShareAlt } from "react-icons/fa";
import { FaLeaf } from "react-icons/fa";
import { Link } from 'react-router-dom';
export const Blog = ({BlogRef}) => {
  const[blog,setBlog]=useState([])
  const{data,loading,error}=useQuery(GET_BLOGS,{
    variables:{
      filter:{
        shopId:347
      }
    }
  })
 useEffect(()=>{
  if(data){
    setBlog(data.Blog)
    
  }

 },[data])
  return (
    <div ref={BlogRef} className='w-full md:px-12'>
      <div className='flex flex-col justify-center gap-1 items-center' >
      <p className='text-4xl   text-center font-bold  '>OUR BLOGS</p>
      <p className='text-center text-2xl text-[#23b923] flex items-center'>-----<FaLeaf />-----</p>
      </div>
 <div className='grid grid-cols-1 md:grid-cols-2   py-10 place-items-center px-12 gap-5 '>

       {blog.map(b=>(
         <div className='flex w-full border py-10 px-10 flex-col gap-7 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
         <div className='flex w-full flex-wrap md:gap-0 gap-5 justify-between  border-b '>
           <div className='md:w-1/2  w-full'>
           <img className='rounded-lg object-cover w-52 h-52' src={`https://s3.ap-south-1.amazonaws.com/business.strackit.com/${b.image}`} alt="" />
           </div>
          <div className='flex gap-3 flex-col md:w-1/2 w-full'>
          <p className='text-xl font-bold'>Our blog: </p>
          <p className='text-md'>{b.description.slice(0,150)}...</p>
          <Link to={`/blog/${b.id}`} className='text-[#23b923] text-bold cursor-pointer flex items-center gap-2'>ReadMore<FaArrowRightLong /></Link>
          </div>
         </div>
         <div className='flex md:justify-between w-full flex-wrap  md:gap-0 items-center'>
          <div>
          <p ><p className='font-bold'>Created On :</p><p>
           {new Date(b.timestamp).toLocaleString()}
            </p>
            </p>
          </div>
         <div className='flex gap-2 cursor-pointer'>
         <p className='flex gap-1 justify-center items-center'><FaRegHeart />(0)</p>
           <p  className='flex gap-1 justify-center items-center'><IoMdChatboxes />(0)</p>
           <p  className='flex gap-1 justify-center items-center'><FaShareAlt />(0)</p>
         </div>
         </div>
            </div>
       ))}

 </div>
    </div>
  )
}
