"use client"
import { Button } from '@app/components/ui/button'
import IMAGES from '@config/images'
import deleteVote from '@services/api/apiPage/deleteVote'
import vote from '@services/api/apiPage/vote'
import React from 'react'
import { toast } from 'sonner'

function VoteBar(props:any) {
    console.log(props.userVote);
    
    function handleVote(voteType:string) {
        if (voteType===props.userVote) {
           deleteVote(props.apiId,props.discussionId,props.answerId).then((Response)=>{
          if (Response.status==="success") {
           console.log("success");
           
            
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
                console.log("success");
               
              }else{
                console.log("success");
              }
             })
          }else {
            if(voteType==="down"){
               vote({vote:"down"},props.apiId,props.discussionId,props.answerId).then((Response)=>{
                if (Response.status==="success") {
                  console.log("success");
                 
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
    <div className='flex flex-col items-center gap-y-2 p-2'>
    <Button onClick={()=>handleVote("up")} className={ (props.userVote==="up") ? ' w-7 h-7 bg-[#E3F0FF] hover:bg-[#E3F0FF] rounded-2 flex justify-center items-center p-0' : ' w-7 h-7 bg-white hover:bg-[#E3F0FF] rounded-2 flex justify-center items-center p-0' }>
      <img className="w-4 h-4" src={IMAGES.ANSWER_VOTE.upVote}></img>
    </Button>
    <span className='text-primary font-bold'>{props.votes}</span>
    <Button onClick={()=>handleVote("down")} className={ (props.userVote==="down") ? ' w-7 h-7 bg-[#E3F0FF] hover:bg-[#E3F0FF] rounded-2 flex justify-center items-center p-0' : ' w-7 h-7 bg-white hover:bg-[#E3F0FF] rounded-2 flex justify-center items-center p-0' }>
      <img className="w-4 h-4" src={IMAGES.ANSWER_VOTE.downVote}></img>
    </Button>
</div>
  )
}

export default VoteBar