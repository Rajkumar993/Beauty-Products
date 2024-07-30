import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { GET_CATEGORIES } from '../../apollo/Apollo';
export const Categorey = ({All,setArr,setCate}) => {
  const [categorie,setCategorie]=useState([])
  const{data,loading,error}=useQuery(GET_CATEGORIES,{
    variables:{
      filter:{
        shopId:347,
        status:1
      }
    }
  })
  useEffect(()=>{
 if(data){
 setCategorie(data.categories)
 }
  },[data])

  return (
    <div className='flex justify-center items-center  py-5'>
      <div className=' flex flex-col pb-10 relative  bg-gray-200 '>
      <div className='bg-green-500 text-white px-20  py-2 font-bold'>
        <p>CATEGORIES</p>
      </div>
      <div className='flex justify-center'>
        <ul className='flex flex-col list-disc cursor-pointer'>
        <li className='hover:text-green-500' onClick={()=>{
            All()
           
            }}>ALL</li>
       {categorie.map((cat,inx)=>(
          <li key={inx} onClick={()=>setCate(cat.category)}  className='hover:text-green-500'>{cat.category}</li>
       ))}
          
        </ul>
      </div>
     
      </div>
      <p className='text-2xl md:hidden absolute top-0 right-0 bg-green-500 text-white'  onClick={()=>setArr(false)}><IoIosArrowBack /></p>
    </div>
  )
}
