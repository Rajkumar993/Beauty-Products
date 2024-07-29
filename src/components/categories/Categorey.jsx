import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
export const Categorey = ({setArr,arr,Headphn,Computers,Pendrive,All,Moniter,Printer,Adapter,Temperglass,PowerBank,Airpods}) => {
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
          <li className='hover:text-green-500' onClick={Headphn}>HEAD PHONES</li>
          <li className='hover:text-green-500'onClick={Moniter}>MONITER</li>
          <li className='hover:text-green-500'onClick={Adapter}>ADAPTER</li>
          <li className='hover:text-green-500'onClick={Temperglass}>TEMPER GLASS</li>
          <li className='hover:text-green-500' onClick={PowerBank}>POWER BANK</li>
          <li className='hover:text-green-500' onClick={Airpods}>AIR PODS</li>
          <li className='hover:text-green-500'onClick={Printer}>PRINTER</li>
          <li className='hover:text-green-500' onClick={Pendrive}>PENDRIVE</li>
          <li className='hover:text-green-500' onClick={Computers}>WEBCAMS</li>
        </ul>
      </div>
     
      </div>
      <p className='text-2xl md:hidden absolute top-0 right-0 bg-green-500 text-white'  onClick={()=>setArr(false)}><IoIosArrowBack /></p>
    </div>
  )
}
