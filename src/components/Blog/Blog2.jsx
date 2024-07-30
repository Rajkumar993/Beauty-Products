import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GET_BLOGS } from '../../apollo/Apollo'

export const Blog2 = () => {
  const {id}=useParams()
  const[blog,setBlog]=useState([])
  const {data,loading,error,refetch}=useQuery(GET_BLOGS,{
    variables:{
      filter:{
        shopId:347
      }
    }
  })
  useEffect(()=>{
    refetch()
    if(data){
      setBlog(data.Blog.filter(b=>b.id==id))

    }
   
  },[data])
  if(loading) {
    return (
   <div className='w-full flex items-center h-screen justify-center'>
   <div className='w-12 h-12 border border-3 rounded-full border-[#23b923]  border-t-0 animate-spin'>
   
   
   </div>
   </div>
    )
   }
  return (
    <>
    {blog.map(b=>(
      <div className='py-20 flex flex-col gap-4 items-center md:px-12'>
      <div className='md:w-1/2 w-full flex flex-col items-center gap-3'>
       <img className='w-full' src={`https://s3.ap-south-1.amazonaws.com/business.strackit.com/${b.image}`} alt="" />
       <p className='md:text-4xl text-2xl font-bold'>{b.title}</p>
       <p className='font-bold'>Created On :{new Date(b.timestamp).toLocaleString()}</p>
      </div>
      <div className='w-full px-2 md:px-32'>
        <p className='md:text-xl'>{b.description}</p>
      </div>
     </div>
    ))}
    </>
  )
}

