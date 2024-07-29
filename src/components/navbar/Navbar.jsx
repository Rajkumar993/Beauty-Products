import React, { useEffect, useState } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector,useDispatch } from 'react-redux';
import { login } from '../../feature/AuthSlice';
import { IoMenu } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import HOST from '../../env';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CART, GET_WHISHLIST } from '../../apollo/Apollo';
export const Navbar = ({handleScroll,scrollToBlog}) => {
  const {authState,userId}=useSelector(state=>state.auth)
  const[wish,setWish]=useState([])
  const {error:wisherror,loading:wishloading,data:wishdata,} = useQuery( GET_WHISHLIST , {
    variables: {
      filter: {
        userId,
        shopId: 348,
      },
      
    },
  
  });
 
  const[cart,setCart]=useState([])
  const{data:cartData,loading,error,refetch}=useQuery(GET_CART, {
    variables: {
      filter: {
        userId: userId,
        shopId: 348,
      },
    },
  })
  useEffect(()=>{
    if(wishdata){
      setWish(wishdata.wishlist.filter(li=>li !=null))
    }
  },[wishdata])
useEffect(()=>{
if(cartData){
  setCart(cartData.cart)
}

},[cartData])
  const [showlist,setShowList]=useState(false)
  const[ioMenu,setIomenu]=useState(false)
  const{data}=useSelector(state=>state.clength)
  const[showNav,setShowNav]=useState(false)
  const [showLogin,setShowLogin]=useState(false)
 

  const dispatch = useDispatch();
  function handleLogin() {
    window.location.href =
      "https://you.strackit.com/?redirectto="+ HOST;
  }
  const logOut = async (e) => {
    await Cookies.remove('ualum');
    window.location.href = HOST;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const cookieValue = urlParams.get("value");

    if (cookieValue) {
      Cookies.set("ualum", decodeURIComponent(cookieValue));
      dispatch(login({ userId: parseInt(cookieValue) })); // userId is extracted from cookieValue
      window.location.href = HOST;
    }
  }, [dispatch]);

  useEffect(()=>{
    const handleScroll=()=>{
      if(window.scrollY>150){
        setShowNav(true)
      }
      if(window.scrollY<50){
        setShowNav(false)  
      }
    }
    handleScroll()
    window.addEventListener('scroll',handleScroll)
    
  },[])

  return (
    <>
    <div className='flex font-bold text-[16px] md:text-xl relative text-gray-600 px-4 items-center py-6 md:py-4 w-full md:px-32 justify-between shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]'>
  <Link to={'/'}>    <div>
    SRI ELECTRONICS
      </div></Link>
      <div className=''>
        <ul className='hidden md:flex justify-between  gap-10 py-8 '>
          <li className='cursor-pointer  relative whitespace-nowrap'   
          
          >
            <Link to={'/'}>Home</Link>           
              
           
          </li>
        <Link to={'/'}> 
         <li  onClick={handleScroll} className='cursor-pointer  relative whitespace-nowrap' >Products
            

            </li>
            
            </Link>
            <Link to={'/'}>   <li onClick={scrollToBlog}>Blog</li></Link>  
     
            <Link to={`${document.cookie?'/wishlist':'/'}`} onClick={()=>{
            if(document.cookie == ''){
              window.alert('Login to Continue');
              return;
            }
          }} >
          <li className='cursor-pointer relative    whitespace-nowrap' >
            WishList
            <p className='absolute -right-2 text-[11px] text-white text-center w-4 h-4 leading-4 rounded-full bg-red-600 -top-1'>{wish.length}</p>
          </li>
          
          </Link>
          
        </ul>
     { ioMenu &&  <div className='absolute z-[2000] md:hidden -bottom-10 left-0  w-full'> 
  <ul className='flex  bg-green-500 justify-between px-4 py-2 text-white'>
  <Link to={'/'}>Home</Link>  
  <Link to={'/'}> 
         <li  onClick={handleScroll} className='cursor-pointer  relative whitespace-nowrap' >Products
            

            </li>
            
            </Link>
            <Link to={'/'}>   <li onClick={scrollToBlog}>Blog</li></Link>  
  
            <Link to={`${document.cookie?'/wishlist':'/'}`} onClick={()=>{
            if(document.cookie == ''){
              window.alert('Login to Continue');
              return;
            }
          }} >
          <li className='cursor-pointer relative    whitespace-nowrap' >
            WishList
            <p className='absolute -right-2 text-[11px] text-white text-center w-4 h-4 leading-4 rounded-full bg-red-600 -top-1'>{wish.length}</p>
          </li>
          
          </Link>
  </ul>
        </div>}
      </div>
      <div className='flex gap-6 relative'>
       <Link to={`${document.cookie?'/cart':'/'}`} onClick={()=>{
         if(document.cookie == ''){
          window.alert('Login to Continue');
          return;
        }
       }}><FaShoppingCart  className='text-2xl'/><p className='absolute right-[85px] md:right-10 text-[11px] text-white text-center w-4 h-4 leading-4 rounded-full bg-red-600 -top-1'>
         {cart.length}
         </p></Link>
       <FaRegUserCircle  className='text-2xl' onClick={()=>{setShowLogin(!showLogin)}} />
       {showLogin &&<div className='absolute top-7 bg-gray-700 text-white px-5'>
      {authState ? 
      <p className='px-4 rounded-md' onClick={()=>{logOut()
        setShowLogin(false)
      } }>logout</p>:
      
      <p  className='px-4 rounded-md'>  
                <p onClick={(e) => {
                e.preventDefault();
                handleLogin()
                setShowLogin(false)
              }}>Login</p>
            
      
      </p>
      
      }
       </div>}
       <div className='text-2xl  md:hidden'>
       {ioMenu?<MdOutlineClose onClick={()=>setIomenu(false)}/>:<IoMenu   onClick={()=>setIomenu(true)}/>}
       </div>
      </div>
    
    </div>
     <div className={`flex fixed top-0 left-0   z-40 py-6 md:py-0  font-bold text-[16px] md:text-xl bg-white text-gray-600 items-center px-4 transition-all duration-1000 w-full md:px-32 justify-between shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] ${showNav?" translate-y-0 h-27 ":"h-0 -translate-y-44  overflow-hidden"}`}>
 <Link to={'/'}>    <div>
    SRI ELECTRONICS
      </div></Link>
      <div>
        <ul className=' hidden md:flex justify-between  gap-10 py-8 '>
          <li className='cursor-pointer  relative whitespace-nowrap'
        
          >
              <Link to={'/'}>Home</Link>        
              <ul className={`absolute  shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-[16px] font-thin transition-all duration-500 bg-white  top-[60px] -left-10  ${showlist?'h-80 overflow-hidden z-50':"h-0 overflow-hidden z-0"}`}>
                <li className='border-b w-full px-5 py-2'>Home Page One</li>
                <li className='border-b w-full px-5 py-2'>Home Page Two</li>
                <li className='border-b w-full px-5 py-2'>Home Page Three</li>
                <li className='border-b w-full px-5 py-2'>Home Page Four</li>
                <li className='border-b w-full px-5 py-2'>Home Page Five</li>
                <li className='border-b w-full px-5 py-2'>Home Page Six</li>
                <li className='border-b w-full px-5 py-2'>Home Page Seven</li>
              </ul>
           
          </li>
          <li className='cursor-pointer  relative whitespace-nowrap'  >
           <Link to={'/'}><p onClick={handleScroll}>Products</p></Link> 
           
          </li>
          <Link to={'/'}>   <li onClick={scrollToBlog}>Blog</li></Link>  
          <Link to={`${document.cookie?'/wishlist':'/'}`} onClick={()=>{
            if(document.cookie == ''){
              window.alert('Login to Continue');
              return;
            }
          }}>
          <li className='cursor-pointer relative    whitespace-nowrap' >
            WishList
            <p className='absolute -right-2 text-[11px] text-white text-center w-4 h-4 leading-4 rounded-full bg-red-600 -top-1'>{wish.length}</p>
          </li></Link>
        
    

       
        </ul>
      </div>
      <div className='flex gap-6 relative'>
      <Link to={`${document.cookie?'/cart':'/'}`} onClick={()=>{
         if(document.cookie == ''){
          window.alert('Login to Continue');
          return;
        }
       }}><FaShoppingCart className='text-2xl' /> <p className='absolute right-10 text-[11px] text-white text-center w-4 h-4 leading-4 rounded-full bg-red-600 -top-1'>{cart.length}</p></Link>
       <FaRegUserCircle className='text-2xl' onClick={()=>setShowLogin(!showLogin)} />
       {showLogin &&<div className='absolute top-[56px] bg-gray-700 text-white px-5'>
      {authState ? 
      <p  className='px-4 rounded' onClick={()=>{logOut()
        setShowLogin(false)
      } }>logout</p>:
      
      <p>  
                <p  className='px-4 rounded' onClick={(e) => {
                e.preventDefault();
                handleLogin()
                setShowLogin(false)
              }}>Login</p>
            
      
      </p>
      
      }
       </div>}
      </div>
      
       <div className='text-2xl  md:hidden'>
       {ioMenu?<MdOutlineClose onClick={()=>setIomenu(false)}/>:<IoMenu   onClick={()=>setIomenu(true)}/>}
       </div>
       { ioMenu &&  <div className='absolute z-[2000]  md:hidden  -bottom-10 left-0  w-full'> 
  <ul className='flex bg-green-500 justify-between px-4 py-2 text-white'>
  <Link to={'/'}>Home</Link> 
  <Link to={'/'}><p onClick={handleScroll}>Products</p></Link> 
  <Link to={'/'}>   <li onClick={scrollToBlog}>Blog</li></Link>  
  <Link to={`${document.cookie?'/wishlist':'/'}`} onClick={()=>{
            if(document.cookie == ''){
              window.alert('Login to Continue');
              return;
            }
          }} >
          <li className='cursor-pointer relative    whitespace-nowrap' >
            WishList
            <p className='absolute -right-2 text-[11px] text-white text-center w-4 h-4 leading-4 rounded-full bg-red-600 -top-1'>{wish.length}</p>
          </li></Link>
  </ul>
        </div>}
    </div>
    </>
  )
}
