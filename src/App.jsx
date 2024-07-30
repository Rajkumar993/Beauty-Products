import React, { useRef } from 'react'
import './App.css'
import { Home } from './Home'
import { Contact } from './components/contact details/Contact'
import { Navbar } from './components/navbar/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Cart } from './components/cart/Cart'
import { SingleProduct } from './components/Products/SingleProduct'
import { WhishList } from './components/wishList/WhishList'
import Footer from './components/footer/Footer'
import { Blog2 } from './components/Blog/Blog2'
function App() {
  const ScrollRef=useRef(null)
const BlogRef=useRef(null)
  const handleScroll=()=>{
    ScrollRef.current.scrollIntoView({behavior:"smooth"})
  }
  const scrollToBlog=()=>{
    BlogRef.current.scrollIntoView({behavior:"smooth"})
  }
  
  return (
    <>
    <BrowserRouter>
    <Navbar scrollToBlog={scrollToBlog} handleScroll={handleScroll}/>
    <Routes>
      <Route path='/' element={<Home BlogRef={BlogRef} ScrollRef={ScrollRef}/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/products/:id' element={<SingleProduct/>}/>
      <Route path='/wishlist' element={<WhishList/>}/>
      <Route path='/blog/:id' element={<Blog2/>}/>
    </Routes>
  <Footer/>
    </BrowserRouter>
 
    </>
  )
}

export default App
