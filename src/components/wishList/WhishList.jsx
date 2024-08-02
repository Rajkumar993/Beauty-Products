import React, { useEffect, useState } from 'react'
import { GET_WHISHLIST } from '../../apollo/Apollo';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_TO_CART } from '../../apollo/Mutation';
import { useSelector } from 'react-redux';
import { FaHeart } from "react-icons/fa";
import { DELETE_WISH_LIST } from '../../apollo/Mutation';
import { Link } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
export const WhishList = () => {
  const {authState,userId}=useSelector(state=>state.auth)
  const [wishData,setWishData]=useState([])
  const [mutateFunction, { data:Cartdata, loading:Cartloading, error:Carterror }] = useMutation(ADD_TO_CART)
  const [deletelist,{data,error,loading,}]=useMutation
  (DELETE_WISH_LIST)
   const {error:wisherror,loading:wishloading,data:wishdata, refetch} = useQuery( GET_WHISHLIST , {
    variables: {
      filter: {
        userId,
        shopId: 347,
      },
      
    },
  
  });
 
  useEffect(()=>{
    refetch()
     if(wishdata){
      setWishData(wishdata.wishlist.filter(li=>li !==null))
     }
  },[wishdata])
  console.log(wishData)
  const handleDelete=(id)=>{
    deletelist({
      variables: {
        delete: true,
        shopId: 347,
        productId:Number(id),
        userId
      },
    }).then(res=>{ 
  
    refetch()
    toast.success('item removed from wishlist')
  
      }).catch(err=>{
      console.error(err);
     
  
    })}
    if(loading) {
      return (
     <div className='w-full flex items-center h-screen justify-center'>
     <div className='w-347 h-347 border border-3 rounded-full border-[#23b923]  border-t-0 animate-spin'>
     
     
     </div>
     </div>
      )
     }
  return (
    <div className='py-10 '>
   {wishData.length? <div className='flex w-full flex-col gap-4 justify-center items-center'>
      <div className='flex flex-col items-center mt-4 md:gap-2'>
        <p className='md:text-2xl text-xl'><FaHeart/></p>
        <p className='md:text-4xl text-2xl'>MY WISHLIST</p>
      </div>
    
      <div className='container mx-auto border'>
    <div className='flex justify-around font-bold border border-black'>
     
      <p  className='flex-1 text-center'>Image</p>
      <p  className='flex-1 hidden md:block'>Product Name</p>

      <p  className='flex-1'>Price</p>
      <p  className='flex-1 text-center'>Action</p>
    </div>
  {wishData.map((data,inx)=>(
    <div key={inx} className='flex py-3 justify-around font-bold border '>
     <div className=' w-10 h-20    flex-1'>
     <img  className=' w-full  object-contain   h-full' src={`https://s3.ap-south-1.amazonaws.com/business.strackit.com/${data.featureImage}`} alt="" />
     <p  className='md:hidden text-center'>{data.title}</p>
     </div>
     <p  className='flex-1 hidden md:block'>{data.title}</p>
     <p  className='flex-1'>{(data.prize).toLocaleString()}</p>
     <p  className='flex-1'> 
      <button onClick={()=>{
        if(document.cookie == ''){
          window.alert('Login to Continue');
          return;
        }
        mutateFunction({
          variables: {
            userId,
            productId: Number(data.productId),
            quantity: 1,
            shopId: 347,
          },
        }) .then(res=>(
          toast.success("Added To Cart!")
        )).catch(res=>(
          toast.warning("Item Already Exist!")
        ))
      }} className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-3 md:px-5 py-2.5 text-center me-2 mb-2'>Add To Cart <ToastContainer/></button>
      <button onClick={()=>handleDelete(data.productId)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
        Remove
      </button>
     </p>
    </div>
  ))}

  </div>
    </div>:<div className='flex gap-6  flex-col items-center justify-center py-10 font-bold  md:text-7xl'>
  YOUR WISHLIST IS EMPTY
  <Link to={'/'}><button className='border font-bold transition-all duration-500 text-xl hover:bg-[#23b923] hover:text-white border-[#23b923] px-6 py-2 rounded-full'>Go To Shop</button></Link>
  </div>}
    </div>
  )
}
