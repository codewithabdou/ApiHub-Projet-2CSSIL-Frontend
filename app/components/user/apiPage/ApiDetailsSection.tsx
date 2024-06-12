import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { IMAGES } from '@config'
import getTimeDifference from '@helpers/timeDifference'
function ApiDetailsSection(props:any) {
    const stats=[
        {name:"popularity",
         image:IMAGES.API_STATS.popularity,
        value:`${props.popularity}/10`},
        {name:"Latence",
         image:IMAGES.API_STATS.time,
        value:`${props.latency}ms`},
        {name:"Service",
         image:IMAGES.API_STATS.service,
        value:`${props.service}%`}
    ]
   
  
  
  return (
<div className='w-full flex flex-col gap-y-5 items-center p-5 m-5 bg-white'>
    <div className='sm:flex-row  w-full flex flex-col gap-y-10 items-center justify-center  '>
        <div className='flex gap-x-5 md:w-1/2 w-full'>
         <Avatar className=" rounded-full w-24 h-24">
          <AvatarImage src={props.image} />
          <AvatarFallback>API</AvatarFallback>
          </Avatar>  
            <div className='flex flex-col gap-y-2 items-start'>
                <h1 className='sm:text-3xl text-2xl font-bold text-[#184173]'>{props.name}</h1>
                <p> Par <span className='text-[#184173] font-bold'>{props.supplier}</span>| Mise a jour il y a {getTimeDifference(props.updateDate)} | <span className='text-[#184173] font-bold'>{props.category}</span> </p>
            </div>      
        </div>
        <div className='sm:flex  sm:flex-row flex-col gap-y-5  sm:gap-x-5 items-center'>
            {stats.map((stat,index)=>(
               <div className='flex flex-col  items-center w-full'>
               <div className='w-28 h-10 bg-[#184173] rounded-[7px] flex gap-x-2 items-center p-2'>
                  <img className='w-4 h-4' src={stat.image}></img>
                  <p className='font-bold text-white text-sm'>{stat.name}</p>
               </div>
               <h1 className='font-bold text-[#184173] text-xl'>{stat.value}</h1>
          </div>
            ))}
            
           
        </div>
    </div>
    <div className='w-full h-[1px] bg-[#184173]'></div>
</div>
  )
}

export default ApiDetailsSection