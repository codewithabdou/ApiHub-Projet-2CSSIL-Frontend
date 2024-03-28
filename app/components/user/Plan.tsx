import React from 'react'
import { Button } from '../ui/button'

function Plan(props:any) {
  return (
    <div className='sm:w-64 sm:h-80 w-48 h-64 bg-[#184173] rounded-[24px] flex flex-col justify-around items-center p-5'>
        <div className='flex flex-col gap-y-2 items-center'>

        
        <h1 className='text-[#FEC53D] font-bold sm:text-2xl text-xl w-fit'>{props.name}</h1>
        <p className='text-white font-light text-sm'>Tarification</p>
            <h1 className='text-[#FEC53D] font-bold sm:text-2xl text-xl '>{props.price}DZD/{props.duration}</h1>
            <p className='text-white font-light'>Nombre de requettes</p>
            <h1 className='text-[#FEC53D] font-bold sm:text-2xl text-xl'>{props.nbrRequests}/{props.duration}</h1>
            </div>
            <Button className='border-2 rounded-[20px] sm:w-32 w-24 border-[#FEC53D] text-[#FEC53D]'>Acheter</Button>



    </div>
  )
}

export default Plan