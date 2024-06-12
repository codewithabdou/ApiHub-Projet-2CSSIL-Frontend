"use client"
import React from 'react'
import SubscriptionDetails from './SubscriptionDetails'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@app/components/ui/table"
import { Button } from '@app/components/ui/button'
import convertToDate from '@helpers/convertToDate'
function SubscriptionsSection(props:any) {
 
  return (
    <div className="w-full flex flex-col gap-y-5 items-start p-5">
            <Table>
      <TableCaption>Liste de tous les abonements.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Souscription</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
       {props.subs.map((sub:any,index:any)=>(
             <TableRow className='w-full' key={index}>
             <TableCell className='w-full' >
             <div className=" flex flex-col  items-start gap-y-2 ">
               <h1 className="sm:text-xl text-sm font-normal ">
                 Plan: <span className="text-primary font-bold">{sub.api_plan}</span>
               </h1>
               <h1 className="sm:text-xl text-sm font-normal ">
                 Date d'abonement: <span className="text-primary font-bold">{convertToDate(sub.start_date)}</span>
               </h1>
               <h1 className="sm:text-xl text-sm font-normal ">
                 Date d'expiration: <span className="text-primary font-bold">{convertToDate(sub. end_date)}</span>
               </h1>
               <h1 className="sm:text-xl text-sm font-normal ">
                 Prix: <span className="text-primary font-bold">{(sub. price)}</span>
               </h1>
               <h1 className="sm:text-xl text-sm font-normal ">
                 Nombre de requettes restantes: <span className="text-[#1CAE56] font-bold">{sub.remaining_requests}</span>
               </h1>
 
               </div>
             </TableCell>
             <TableCell>
               <Button className='bg-[#1CAE56]' onClick={()=>{props.setSelectedSub(sub);
                
               }}>Voir</Button>
             </TableCell>
 
             
           </TableRow>
       ))}
          
       
      </TableBody>
     
    </Table>
        
    </div>
  )
}

export default SubscriptionsSection