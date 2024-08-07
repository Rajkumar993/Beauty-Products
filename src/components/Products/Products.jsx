import React, { useEffect, useState,CSSProperties  } from 'react'
import { GET_PRODUCTS } from '../../apollo/Apollo';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowForward } from "react-icons/io";
import { useQuery } from '@apollo/client';
import { FaLeaf } from "react-icons/fa";

import { Categorey } from '../categories/Categorey';
import noproductPng from '../../assets/noproduct.png'

import { ProdutsCard } from './ProdutsCard';

export const Products = ({ScrollRef}) => {
  const {authState,userId}=useSelector(state=>state.auth)
  const[soon,setSoon]=useState(false)
  const[arr,setArr]=useState(false)
  const[cate,setCate]=useState('')


  const [products, setProducts] = useState([]);
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      filter: {
        shopId: 347,
        userId: userId,
      },
    },
  });

  useEffect(() => {
    if (data) {
      setProducts(data.products); 
    }
  }, [data]);
  console.log(products)

  useEffect(()=>{
 
if(data){
  const lowerCaseCate = cate.toLowerCase().trim();
  setProducts(data.products.filter(pro=>(pro.name).toLowerCase().trim().includes(lowerCaseCate)))
}

},[cate])
useEffect(()=>{
  if(products==''){
    setSoon(true)
  }else{
    setSoon(false)
  }
},[products])
const All=()=>{
  if(data){
    setProducts(data.products);
  }

}
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
    <div ref={ScrollRef} className='py-20 min-h-[110vh] relative px-12'>
    <div className='flex flex-col md:ml-80 pt-4 justify-center gap-1 items-center' >
      <p className='text-4xl   text-center font-bold  '>PRODUCTS</p>
      <p className='text-center text-2xl text-[#23b923] flex items-center'>-----<FaLeaf />-----</p>
      </div>
  { soon?<div className='  w-full flex flex-col justify-center items-center'>
    <img className='w-96' src={noproductPng} alt="" />
    <p className='text-xl font-bold text-[#23b923]'>Currently Unavalilable...</p>
    </div>: <div className="grid md:ml-80  mt-5 grid-cols-1 md:grid-cols-2   xl:grid-cols-3 gap-7 items-center  place-items-center">
    {
      products.map(product=>(
           <ProdutsCard key={product.id} product={product}/>
  //        <div key={product.id} className='shadow-[0_3px_10px_rgb(0,0,0,0.2)] relative flex flex-col items-center py-10  gap-4 rounded-xl  min-w-[300px] min-h-[400px]'>
  // <div className='absolute text-xl right-5 top-5'>
  //   <button disabled={wishLoading}  onClick={()=>{
  //         setheartVal(product.id)
  //         if (!document.cookie) {
  //     window.alert('Login to Continue');
  //     return;
  //   }
  //   mutateWishlist({
  //     variables: {
  //       userId,
  //       productId: Number(product.id),
  //       shopId: 347,
  //       delete: false,
  //     },
  //   }).then(res=>(
  //     toast.success("Added To Wishlist!")
  //   )).catch(res=>(
  //     toast.warning("Item Already Exist!")
  //   ))

  //   }}>{heartVal===product.id?<FaHeart className='text-[#23b923]'/>:<FaRegHeart   />}</button>
  // </div>
  //  <Link to={`/products/${product.id}`}> <div className='w-52 h-52 hover:scale-110 transition-all duration-500'>
  //        <img className="w-full object-contain rounded-full  border-2 border-[#23b923] h-full" src={`https://s3.ap-south-1.amazonaws.com/business.strackit.com/${product.featureImage}`} alt="" />
  //        </div> </Link> 
  //        <div>
  //         <p className='text-xl font-bold hover:text-[#23b923] '>{product.name}</p>
  //        </div>
  //        <div>
  //         <p className='text-2xl font-bold text-[#23b923] '> {product.prize}</p>
  //        </div>
  //        <div> 
  //         <button onClick={() => {
  //           if(document.cookie == ''){
  //             window.alert('Login to Continue');
  //             return;
  //           }
  //           mutateFunction({
  //             variables: {
  //               userId,
  //               productId: Number(product.id),
  //               quantity: 1,
  //               shopId: 347,
  //             },
  //           }) .then(res=>(
  //             toast.success("Added To Cart!")
  //           )).catch(res=>(
  //             toast.warning("Item Already Exist!")
  //           ))
            
              
  //           }} className='border font-bold transition-all duration-500 hover:bg-[#23b923] hover:text-white border-[#23b923] px-6 py-2 rounded-full'>
  //           Add To Cart
  //         </button>
         
  //         </div>
  //       </div>
      
      ))
    }
    </div>}
    <p className='text-white absolute top-40 text-2xl left-0 bg-[#23b923]'>
      <IoIosArrowForward onClick={()=>setArr(true)} /></p>
<div className={`absolute -translate-x-96 md:translate-x-0 top-[100px] w-80 bg-white h-96  bottom-0 left-0 right-0 ${arr?"translate-x-0":"-translate-x-96"}`}>

<Categorey All={All} setArr={setArr} arr={arr} setCate={setCate}/>
</div>
    </div>
    
    </>
  )
}
