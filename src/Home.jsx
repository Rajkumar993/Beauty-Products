

import { ToastContainer } from 'react-toastify'
import { Banner } from './components/banner/Banner'
import { Products } from './components/Products/Products'
import { Blog } from './components/Blog/Blog'

export const Home = ({ScrollRef,BlogRef}) => {

  return (
    <div className='relative '>
      
     <Banner/>
   <Products ScrollRef={ScrollRef}/>
   <ToastContainer/>
   <Blog BlogRef={BlogRef}/>
    </div>
  )
}
