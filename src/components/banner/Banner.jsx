import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import {SHOP_DETAILS} from '../../apollo/Apollo'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
export const Banner = () => {

  const[banner,setBanner]=useState([])
  const {data,loading,error}=useQuery(SHOP_DETAILS,{
    variables:{
      filter:{
        shopId:348
      }
    }
  })
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 3000,
    arrows: false
    
  };
  useEffect(()=>{
    if(data){
     setBanner(data.banners)
     console.log(banner)
    }
  },[data])

  return (
    <Slider {...settings}>
    {banner.map((b,inx)=>(
      <div key={inx} className='w-full  h-full   bg-black'>
                <div className='flex py-20 overflow-hidden justify-center items-center'>
                <img className="max-w-[250px] max-h-[350px]" src={ `https://s3.ap-south-1.amazonaws.com/business.strackit.com/${b.image}`} alt="" />
                </div>

      </div>
    ))}
    </Slider>
    
  )
}
