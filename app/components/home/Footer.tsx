import React from 'react'
import IMAGES from '@config/images'
function Footer () {
  return (
    <div className='flex flex-col w-full  justify-end items-center'>
        <div className='w-full  h-[120px] bg-[#184173] text-white md:text-xl text-lg font-bold flex items-center justify-center '>1<span className='text-[#FEC53D]'>00</span>1 API  @ 2024 All rights reserved</div>
        <div className='w-full h-[7px] bg-[#FEC53D]'></div>
        <div className='w-full h-[120px] bg-[#184173] flex justify-center items-center  '>
            <div className='flex justify-evenly items-center md:w-[25%] w-[350px]'>
            <a href='_blank'><img className='md:w-11 md:h-11 w-9 h-9' src={IMAGES.Instagram}></img></a>
            <a href='_blank'><img className='md:w-11 md:h-11 w-9 h-9' src={IMAGES.Facebook}></img></a>
            <a href='_blank'><img className='md:w-11 md:h-11 w-9 h-9' src={IMAGES.Twitter}></img></a>
            <a href='_blank'><img className='md:w-11 md:h-11 w-9 h-9' src={IMAGES.LinkedIn}></img></a>
            </div>
            </div>
    </div>
  )
}

export default Footer