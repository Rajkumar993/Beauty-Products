import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { ADD_TO_WHISHLIST } from '../../apollo/Mutation'
import { ADD_TO_CART } from '../../apollo/Mutation';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
export const ProdutsCard = ({product}) => {
  const {authState,userId}=useSelector(state=>state.auth)
  const[mutateWishlist,{ loading:wishLoading}] = useMutation(ADD_TO_WHISHLIST)
  const [mutateFunction, { data:Cartdata, loading:Cartloading, error:Carterror }] = useMutation(ADD_TO_CART)
 const[heart,setHeart]=useState(false)
  return (
    <div key={product.id} className='shadow-[0_3px_10px_rgb(0,0,0,0.2)] relative flex flex-col items-center py-10  gap-4 rounded-xl  min-w-[300px] min-h-[400px]'>
    <div className='absolute text-xl right-5 top-5'>
      <button disabled={wishLoading}  onClick={()=>{
            if (!document.cookie) {
        window.alert('Login to Continue');
        return;
      }
      setHeart(true)
      mutateWishlist({
        variables: {
          userId,
          productId: Number(product.id),
          shopId: 347,
          delete: false,
        },
      }).then(res=>(
        toast.success("Added To Wishlist!")
      )).catch(res=>(
        toast.warning("Item Already Exist!")
      ))
      
      
      }}>{heart?<FaHeart className='text-[#23b923]'/>:<FaRegHeart   />}</button>
    </div>
  <Link to={`/products/${product.id}`}> <div className='w-52 h-52 hover:scale-110 transition-all duration-500'>
           <img className="w-full object-contain rounded-full  border-2 border-[#23b923] h-full" src={`https://s3.ap-south-1.amazonaws.com/business.strackit.com/${product.featureImage}`} alt="" />
           </div> </Link> 
           <div>
            <p className='text-xl font-bold hover:text-[#23b923] '>{product.name}</p>
           </div>
           <div>
            <p className='text-2xl font-bold text-[#23b923] '> {product.prize}</p>
           </div>
           <div> 
            <button onClick={() => {
              if(document.cookie == ''){
                window.alert('Login to Continue');
                return;
              }
              mutateFunction({
                variables: {
                  userId,
                  productId: Number(product.id),
                  quantity: 1,
                  shopId: 347,
                },
              }) .then(res=>(
                toast.success("Added To Cart!")
              )).catch(res=>(
                toast.warning("Item Already Exist!")
              ))
              
                
              }} className='border font-bold transition-all duration-500 hover:bg-[#23b923] hover:text-white border-[#23b923] px-6 py-2 rounded-full'>
              Add To Cart
            </button>
           
            </div>
          </div>
  )
}
