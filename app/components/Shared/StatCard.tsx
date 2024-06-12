import React from 'react'

function StatCard(props:any) {
  return (
    <div className='w-60 h-40 flex flex-col gap-y-2 rounded-[10px] bg-white shadow-lg shadow-gray p-5'>
      <div className='flex justify-between items-center w-full'>
           <h1 className='text-xl font-light'>{props.description}</h1>
           <img className ="w-14 h-14" src={props.icon}/>
      </div>
      <h1 className='text-2xl font-bold'>{props.value}</h1>

    </div>
  )
}

export default StatCard