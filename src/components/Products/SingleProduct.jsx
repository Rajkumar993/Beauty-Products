import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GET_PRODUCTS } from '../../apollo/Apollo';
import { ADD_TO_CART } from '../../apollo/Mutation';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { ToastContainer,toast } from 'react-toastify';
import { ADD_TO_WHISHLIST } from '../../apollo/Mutation'
import { FaStar } from "react-icons/fa";
export const SingleProduct = () => {
  const {authState,userId}=useSelector(state=>state.auth)
  const [product,setProduct]=useState([])
  const [mutateFunction, { data:Cartdata, loading:Cartloading, error:Carterror }] = useMutation(ADD_TO_CART)
  const[mutateWishlist,{ loading:wishLoading}] = useMutation(ADD_TO_WHISHLIST)

  const {id}=useParams()
  const { loading, error, data,refetch } = useQuery(GET_PRODUCTS, {
    variables: {
      filter: {
        shopId: 347,
        userId: userId,
      },
    },
  });

  useEffect(()=>{
    refetch()
    if(data){
      console.log(data)
      setProduct(data.products.filter(p=>Number(p.id)==Number(id)))
    
    }
 
  },[data])

  if(loading) {
    return (
   <div className='w-full flex items-center h-screen justify-center '>
   <div className='w-12 h-12 border border-3 rounded-full border-[#23b923]  border-t-0 animate-spin'>
   
   
   </div>
   </div>
    )
   }
 

  return (
    <div className=' md:py-20 md:px-12 px-4'>
{product.map(pro=>(
<div className='flex flex-col md:flex-row w-full '>
<div className='w-full md:w-1/2 flex justify-center'>
     <img className='w-96 object-cover' src={`https://s3.ap-south-1.amazonaws.com/business.strackit.com/${pro.featureImage}`} alt="" />
    </div>
 <div className='w-full md:w-1/2 flex flex-col gap-3 mt-10 md:mt-0'>
<div className='w-full flex  md:flex-row flex-col justify-between'>
<p className='text-3xl text-center font-bold'>
  {pro.name}
  </p>
  <p className='text-[#23b923] flex gap-2 items-center'><FaStar /> (0 Ratings and 0 Reviews)</p>
</div>
 <p className='text-[#23b923] text-xl font-bold'>{(pro.prize).toFixed(2)}</p>
 <div>
 <p className='font-bold'>Over View:</p>
 <div   className=""dangerouslySetInnerHTML={{ __html: pro?.description }}  />  </div> 
 <div className='flex w-full gap-3'>
 <button onClick={()=>{
   if(document.cookie == ''){
    window.alert('Login to Continue');
    return;
  }
  mutateFunction({
    variables: {
      userId,
      productId: Number(pro.id),
      quantity: 1,
      shopId: 347,
    },
  }).then(res=>toast.success('Item Added to Cart')).catch(res=>toast.warning('Item Alredy Exist In Cart'))


 }} className='border font-bold transition-all w-1/2 duration-500 hover:bg-[#23b923] hover:text-white border-[#23b923] px-6 py-2 rounded-full'>Add To Cart</button>     
 <button onClick={()=>{
    if (!document.cookie) {
      window.alert('Login to Continue');
      return;
    }
    mutateWishlist({
      variables: {
        userId,
        productId: Number(pro.id),
        shopId: 347,
        delete: false,
      },
    }).then(res=>toast.success('Item Added to Wishlist')).catch(res=>toast.warning('item alredy exist in wishlist'))
 }} className='border font-bold transition-all w-1/2 duration-500 hover:bg-[#f1b964] hover:text-white border-[#f1b964] px-6 py-2 rounded-full'>Add To WhishList <ToastContainer/></button>     
 </div>
 </div>

</div>

))}

    </div>
  )
}
