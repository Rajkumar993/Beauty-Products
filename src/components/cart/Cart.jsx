import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GET_CART } from '../../apollo/Apollo'
import { useSelector } from 'react-redux'
import { CartCard } from './CartCard'
import { Link } from 'react-router-dom'
export const Cart = () => {
  const {authState,userId}=useSelector(state=>state.auth)
  const[cart,setCart]=useState([])
  const[total,setTotal]=useState(0)

 
  const{data,loading,error,refetch}=useQuery(GET_CART, {
    variables: {
      filter: {
        userId: userId,
        shopId: 347,
      },
    },
  })

  useEffect(()=>{
   
    if(data){
      refetch()
   setCart(data.cart)
    }
  },[data])

  useEffect(()=>{
   
      if(cart){
        refetch()
        setTotal(cart.reduce((a,b)=>a += b.prize*b.quantity,0).toLocaleString())
      }
     
    },[cart])
  if(loading){
    return (
      <div className='w-full flex items-center h-screen justify-center'>
      <div className='w-12 h-12 border border-3 rounded-full border-[#23b923]  border-t-0 animate-spin'>
      
      
      </div>
      </div>
       )
  }

  return (
   
       <div className='py-10'>
{cart.length ? <div>
<div className='container mx-auto border'>
    <div className='flex justify-around font-bold border border-black'>
     
      <p  className='flex-1 text-center'>Image</p>
      <p  className='flex-1 hidden md:block'>Product Name</p>
      <p  className='flex-1'>Quantity</p>
      <p  className='flex-1'>Price</p>
      <p  className='flex-1'>Remove</p>
    </div>
    
     {cart.map(c=>(
      <CartCard  key={c.id} cart={cart} setCart={setCart} refetch=
      {refetch} cartItems={c}/>
     ))}

  </div>

  <div className='py-10 w-full flex justify-center'>
   <div className='border flex flex-col gap-4 p-4'>
   <div className='flex justify-between gap-3'>
   <p className='font-bold'>SUB TOTAL</p>
   <p>{total}</p>
   </div>
   <div className='flex justify-between gap-3' >
    <p className='font-bold'>GRAND TOTAL</p>
    <p>{total}</p>
   </div>
   <button className='border font-bold transition-all duration-500  hover:bg-[#23b923] hover:text-white border-[#23b923] px-6 py-2 rounded-full'>PROCESS TO CHECKOUT</button>
   </div>
  </div>
</div> : <div className='flex gap-6  flex-col items-center justify-center py-10 font-bold md:text-7xl'>
  YOUR CART IS EMPTY
  <Link to={'/'}><button className='border font-bold transition-all duration-500 text-xl hover:bg-[#23b923] hover:text-white border-[#23b923] px-6 py-2 rounded-full'>Go To Shop</button></Link>
  </div>}
    </div>
  )
}
