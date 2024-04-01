"use client"
import React, { useEffect, useState } from 'react'
import AddDisscussionForm from './AddDisscussionForm'
import DisscussionDetails from './Disscussion'
import getAllDiscussions from '@services/api/apiPage/getAllDisscussions';
import { errorCreateDiscussionResponse, Disscussion } from '@typings/api/disscussionTypes';
import { toast } from 'sonner';
import PaginationBar from '../../Shared/Pagination';


const DiscussionsSection=  (props:any)=> {
  const [data,setData]=useState<Disscussion[]>([]);
  const [refresh,setRefresh]=useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const rowsPerPage=3;
  const [endIndex, setEndIndex] = useState(rowsPerPage);
  useEffect(()=>{
    async function getData (){
      const result:any= await getAllDiscussions(props.id);
      if (result) {
        setData(result.data)
        
      } else {
        toast("Message", {
          description: result.message,
          action: {
            label: "Ok",
            onClick: () => null,
          }}
    )
    
      }}
      getData();
  },[refresh])
 
  return (
      
    <div className='sm:w-full w-full flex flex-col p-5 gap-y-5 z-10'>
      {/**I got some weird errors when i added the pagination i ll try to fix them later (related to live reload) */}
     <AddDisscussionForm setRefresh={setRefresh} id={props.id}/>
     {data && (data/*slice(startIndex, endIndex)*/.map((dis,key)=>(
     <DisscussionDetails setRefresh={setRefresh} userId={dis.user.id} apiId={props.id} id={dis.id} title={dis.title} username={`${dis.user.firstname} ${dis.user.lastname}`} created_date={dis.created_at}/>
     )))}
     {/*data.length ?  (<PaginationBar rowsPerPage={rowsPerPage} startIndex={startIndex} endIndex={endIndex}
          setRefresh={setRefresh}    setStartIndex={setStartIndex} setEndIndex={setEndIndex} length={data.length ? Math.ceil(data.length/ rowsPerPage)*rowsPerPage :0}/>) : null*/}  
     
 </div>
  )
}

export default DiscussionsSection