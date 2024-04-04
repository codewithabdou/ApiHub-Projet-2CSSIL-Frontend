"use client"
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
function AnswerDetails(props:any) {
  const [userId,setUserId]=useState();
  const [userVote,setUserVote]=useState("");
  const [changeVote,setChangeVote]=useState(0);
  useEffect(()=>{
    
    let id;
    if (localStorage.getItem("userId")!==null) {
      id=localStorage.getItem("userId") as string;
      setUserId(JSON.parse(id))
    };
    getUserVotes(props.apiId,props.discussionId,props.answerId).then((Response)=>{
        console.log(Response);
        
      if (Response.status==="success") {
       const result=Response as {data:any}; 
        setUserVote(result.data.data.vote)
      } else setUserVote("")
    })
  },[changeVote]);
  
   function handleVote(voteType:string) {
    if (voteType===userVote) {
       deleteVote(props.apiId,props.discussionId,props.answerId).then((Response)=>{
      if (Response) {
        toast("Message", {
          description: "Vote supprimé",
          action: {
            label: "Ok",
            onClick: () => null,
          }}
    )
        setChangeVote(1);
        props.setRefresh(1)
      }else{
        toast("Message", {
          description: "Erreur",
          action: {
            label: "Ok",
            onClick: () => null,
          }}
    )      }
     })
    } else {
      if(voteType==="up"){
         vote({vote:"up"},props.apiId,props.discussionId,props.answerId).then((Response)=>{
          
          if (Response.status==="success") {
            toast("Message", {
              description: "UpVote Ajouté",
              action: {
                label: "Ok",
                onClick: () => null,
              }}
        )
            setChangeVote(2);
            props.setRefresh(2)
          }else{
            toast("Message", {
              description: Response.message,
              action: {
                label: "Ok",
                onClick: () => null,
              }}
        )
          }
         })
      }else {
        if(voteType==="down"){
           vote({vote:"down"},props.apiId,props.discussionId,props.answerId).then((Response)=>{
            if (Response.status==="success") {
              toast("Message", {
                description: "DownVote ajouté",
                action: {
                  label: "Ok",
                  onClick: () => null,
                }}
          )
              setChangeVote(3);
              props.setRefresh(3)
            }else{
              toast("Message", {
                description: Response.message,
                action: {
                  label: "Ok",
                  onClick: () => null,
                }}
          )
            }
           })
        }
      }
    }
    
  }
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
             <div className='flex flex-col items-center gap-y-2 p-2'>
                      <Button onClick={()=>handleVote("up")} className={ (userVote==="up") ? ' w-7 h-7 bg-[#E3F0FF] hover:bg-[#E3F0FF] rounded-2 flex justify-center items-center p-0' : ' w-7 h-7 bg-white hover:bg-[#E3F0FF] rounded-2 flex justify-center items-center p-0' }>
                        <img className="w-4 h-4" src={IMAGES.ANSWER_VOTE.upVote}></img>
                      </Button>
                      <span className='text-primary font-bold'>{props.votes}</span>
                      <Button onClick={()=>handleVote("down")} className={ (userVote==="down") ? ' w-7 h-7 bg-[#E3F0FF] hover:bg-[#E3F0FF] rounded-2 flex justify-center items-center p-0' : ' w-7 h-7 bg-white hover:bg-[#E3F0FF] rounded-2 flex justify-center items-center p-0' }>
                        <img className="w-4 h-4" src={IMAGES.ANSWER_VOTE.downVote}></img>
                      </Button>
             </div>
        </div>
    </div>
  )
}

export default AnswerDetails