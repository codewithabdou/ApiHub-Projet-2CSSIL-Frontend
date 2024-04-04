//"use client"
import React, { useEffect,useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import getTimeDifference from '@helpers/timeDifference'
import { Button } from '../../ui/button'
import { IMAGES } from '@config'
import DeleteAnswerPpoUp from './DeleteAnswerPpoUp'
import getUserVotes from '@services/api/apiPage/getUserVotes'
import deleteVote from '@services/api/apiPage/deleteVote'
import vote from '@services/api/apiPage/vote'
import { toast } from 'sonner'
import VoteBar from './Vote'
import { getLoggedInUser } from '@services/authentication.service'
const AnswerDetails=async(props:any)=> {
  /*const [userId,setUserId]=useState();
  const [userVote,setUserVote]=useState("");
  const [changeVote,setChangeVote]=useState(0);*/
  let userId;
  let userVote:string="";
  let changeVote;
  //useEffect(()=>{
    const res=await getLoggedInUser();
    userId=res?.id;
   /* let id;
    if (localStorage.getItem("userId")!==null) {
      id=localStorage.getItem("userId") as string;
      setUserId(JSON.parse(id))
    };*/
   await getUserVotes(props.apiId,props.discussionId,props.answerId).then((Response)=>{
        console.log(Response);
        
      if (Response.status==="success") {
       const result=Response as {data:any}; 
        //setUserVote(result.data.data.vote)
        userVote=result.data.data.vote
      } else /*setUserVote("")*/ userVote=""
    })
  //},[changeVote]);
  
  
  return (
    <div className='sm:w-2/3 w-full flex justify-center sm:justify-start gap-x-5'>
      <Avatar className=" rounded-full sm:w-10 sm:h-10 w-7 h-7">
          <AvatarImage src={"https://github.com/shadcn.png"} />
          <AvatarFallback>USER</AvatarFallback>
        </Avatar>
        <div className='w-full flex justify-between items-center shadow-sm shadow-[#979797] border-[#979797]   rounded-[10px] '>
            <div className='flex-col h-full w-full flex justify-between'>

            <div className='flex flex-col gap-y-2 p-3'>
            <span className='text-primary font-bold'>{props.username}</span>
             <div className='w-full  min-h-5 ' style={{ whiteSpace: 'pre-line' }}>
               {props.answer}
             </div>
            </div>
               <div className='flex gap-x-5 items-center px-2'>
               <span className=' text-[#979797] text-[11px]'>{getTimeDifference(props.created_date)}</span>
               {(userId==props.userId) && ( <DeleteAnswerPpoUp setRefresh={props.setRefresh} apiId={props.apiId} discussionId={props.discussionId} answerId={props.answerId}/>)}
                
               </div>
             </div>
             <VoteBar votes={props.votes} apiId={props.apiId} discussionId={props.discussionId} answerId={props.answerId} userVote={userVote}/>

        </div>
    </div>
  )
}

export default AnswerDetails