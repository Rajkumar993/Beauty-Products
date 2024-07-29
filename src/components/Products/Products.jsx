import React, { useEffect, useState,CSSProperties  } from 'react'
import { GET_PRODUCTS } from '../../apollo/Apollo';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowForward } from "react-icons/io";
import { useQuery } from '@apollo/client';
import { ADD_TO_CART } from '../../apollo/Mutation';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { ADD_TO_WHISHLIST } from '../../apollo/Mutation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Categorey } from '../categories/Categorey';



export const Products = ({ScrollRef}) => {
  const {authState,userId}=useSelector(state=>state.auth)
  const[arr,setArr]=useState(false)
  const[heart,setHeart]=useState(false)
  const dispatch=useDispatch()
  const [mutateFunction, { data:Cartdata, loading:Cartloading, error:Carterror }] = useMutation(ADD_TO_CART)
  const[mutateWishlist,{ loading:wishLoading}] = useMutation(ADD_TO_WHISHLIST)

  const [products, setProducts] = useState([]);
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      filter: {
        shopId: 348,
        userId: userId,
      },
    },
  });
const All=()=>{
  setProducts(data.products);
}
  useEffect(() => {
    if (data) {
      setProducts(data.products);
      console.log(products)
    }
  }, [data]);
  const Headphn=()=>{
    setProducts(data.products.filter(p=>(p.name).includes('Head')))
  }
  const Moniter=()=>{
    setProducts(data.products.filter(p=>(p.name).includes('Moniter')))
  }
  const Adapter=()=>{
    setProducts(data.products.filter(p=>(p.name).includes('Adapter')))
  }
  const Temperglass=()=>{
    setProducts(data.products.filter(p=>(p.name).includes('Temper')))
  }
  const PowerBank=()=>{
    setProducts(data.products.filter(p=>(p.name).includes('Power Bank')))
  }
  const Airpods=()=>{
    setProducts(data.products.filter(p=>(p.name).includes('Air Pods')))
  }
  const Printer=()=>{
    setProducts(data.products.filter(p=>(p.name).includes('Printer')))
  }
  const Pendrive=()=>{
    setProducts(data.products.filter(p=>(p.name).includes('Pendrive')))
  }
  const Computers=()=>{
    setProducts(data.products.filter(p=>(p.name).includes('Web')))
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
    <div ref={ScrollRef} className='py-20 relative px-12'>
      <p className='text-4xl text-center border py-2 font-bold  border-[#23b923]'>PRODUCTS</p>
    <div className="grid md:ml-80 pt-4  grid-cols-1 md:grid-cols-2   xl:grid-cols-3 gap-7 items-center  place-items-center">
    {
      products.map(product=>(
       
<div key={product.id} className='shadow-[0_3px_10px_rgb(0,0,0,0.2)] relative flex flex-col items-center py-10  gap-4 rounded-xl  min-w-[300px] min-h-[400px]'>
  <div className='absolute text-xl right-5 top-5'>
    <button disabled={wishLoading}  onClick={()=>{
          setHeart(true)
          if (!document.cookie) {
      window.alert('Login to Continue');
      return;
    }
    mutateWishlist({
      variables: {
        userId,
        productId: Number(product.id),
        shopId: 348,
        delete: false,
      },
    }).then(res=>(
      toast.success("Added To Wishlist!")
    )).catch(res=>(
      toast.warning("Item Already Exist!")
    ))
    
    
    }}><FaHeart  /></button>
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
                shopId: 348,
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
      
      ))
    }
    </div>
    <p className='text-white absolute top-40 text-2xl left-0 bg-green-500'>
      <IoIosArrowForward onClick={()=>setArr(true)} /></p>
<div className={`absolute -translate-x-96 md:translate-x-0 top-40 w-80 bg-white h-96  bottom-0 left-0 right-0 ${arr?"translate-x-0":"-translate-x-96"}`}>

<Categorey setArr={setArr} arr={arr} Pendrive={Pendrive} Computers={Computers} Headphn={Headphn} All={All} Moniter={Moniter} Printer={Printer} Adapter={Adapter} Temperglass={Temperglass} Airpods={Airpods} PowerBank={PowerBank}/>
</div>
    </div>
    
    </>
  )
}
