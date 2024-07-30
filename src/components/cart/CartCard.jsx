import React, { useEffect, useState } from 'react'
import { ADD_QUANTITY } from '../../apollo/Mutation';
import { useSelector } from 'react-redux';
import { useMutation ,useQuery} from '@apollo/client';
import { DELETE_Item } from '../../apollo/Mutation';

import { MdDelete } from "react-icons/md";
export const CartCard = ({cartItems,cart,setCart,refetch}) => {
  const[quantity,setQuantity]=useState(0)
  const [update,setUpdate]=useState(false)

  const[hi,setHi]=useState(false)
  const {authState,userId}=useSelector(state=>state.auth)
useEffect(()=>{
  setQuantity(cartItems.quantity)
},[cartItems])
  const [
    addQuantity,
    { loading: addQuantityLoading, error: addQuantityError },
  ] = useMutation(ADD_QUANTITY);
  const [deleteItem, { loading: deleteItemLoading, error: deleteItemError }] =
    useMutation(DELETE_Item);

  const handleQuantity=()=>{
      setHi(!hi)
    setUpdate(false)
    addQuantity({
      variables:{
        userId,
        productId:cartItems.productId,
        quantity,
        shopId:347,
        update:true
      }
    }).then(res=>(setCart(cart=>cart.map(c=>c.id==res.id?{...c,res}:c)) )).catch(res=>alert('somthing went'))
  
  }

    
  
  const handleDelete=()=>{
    deleteItem({
      variables: {
        delete: true,
        shopId: 347,
        productId:cartItems.productId,
        userId
      },
    }).then(res=>(
        setCart(cart=>cart.filter(c=>c.id !==res.id))
    ))
 
  }
  return (
   <>
<div>
    <div  className='flex justify-between py-6'>

<div className='md:w-20 w-10  h-20 scale-125 md:scale-125 pl-4 md:pl-0 flex-1'>
  <img className="md:w-full w-10 h-10 object-contain    md:h-full" src={`https://s3.ap-south-1.amazonaws.com/business.strackit.com/${cartItems.featureImage}`} alt="" />
  <p  className=' scale-100 text-[12px] md:hidden'>{cartItems.name}</p>
  </div>
  <p  className='flex-1  items-center hidden md:flex'>{cartItems.name}</p>
  <p  className='flex-1 flex flex-col justify-center gap-3'>
<div className='w-full px-5 md:px-0  mr-3 md:mr-0'>
<button className=' border md:px-3 px-4' onClick={()=>{
     if(quantity){
       setQuantity(quantity+1)
       setUpdate(true)
     }
   }}>+</button>
 <input className='border text-center md:w-10  w-11' value={quantity}  type="text" readOnly />
 <button className=' border md:px-3 px-[18px]'
 onClick={()=>{
   if(quantity>1){
     setQuantity(quantity-1)
     setUpdate(true)
   }
 }}>-</button>
</div>
{update && <button className='border w-20 text-center md:w-28 font-bold transition-all duration-500 hover:bg-[#23b923] hover:text-white border-[#23b923] md:px-6 py-2 rounded-full' onClick={()=>handleQuantity()}>update</button>}
  </p>
  <p  className='flex-1 flex  items-center'>{((cartItems.prize*quantity).toLocaleString())}</p>
  <button  className='md:flex-1 mr-10 md:mr-0 pl-10 text-red-700 text-2xl text-center cursor-pointer ' onClick={()=>handleDelete()}><MdDelete  /></button>
</div>
    </div>  

   </>
  )
}
