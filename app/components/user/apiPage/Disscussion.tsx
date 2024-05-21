import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion'
import {Avatar , AvatarFallback, AvatarImage } from '../../ui/avatar'
import getTimeDifference from '@helpers/timeDifference'
import { Answer, successCreateDiscussionResponse } from '@typings/api/disscussionTypes'
import getDiscussion from '@services/api/apiPage/getDiscussionById'
import AddAnswerForm from './AddAnswerForm'
import AnswerDetails from './AnswerDetails'
import DeleteDiscussionPopUp from './DeleteDiscussionPopUp'
import { toast } from 'sonner'
import { getLoggedInUser } from '@services/authentication.service'
import { ErrorType } from '@typings/entities/Error'
const DisscussionDetails= async(props:any)=> {
  let discussion: successCreateDiscussionResponse | undefined = undefined;
  let userId;
   const result:{data:successCreateDiscussionResponse,status:string,message:string} | ErrorType=await getDiscussion(props.apiId,props.id)
      if (result.status==="success") {
        const res= result as {data:successCreateDiscussionResponse,status:string,message:string};
         discussion=res.data;
      } else {
        toast("Message", {
          description: result.message,
          action: {
            label: "Ok",
            onClick: () => null,
          }}
    )
      }
    const res=await getLoggedInUser();
    userId=res?.id;
   
  
  return (
    <Accordion type="single" collapsible className='w-full border-[2px] border-[#184173] p-5 rounded-[7px] bg-white overflow-x-hidden z-10'>
    <AccordionItem value="item-1">
      <AccordionTrigger className='text-[#184173] font-bold'>
       <div className='flex w-1/3 gap-x-5 items-start'>
       <Avatar className=" rounded-full sm:w-12 sm:h-12 w-10 h-10">
          <AvatarImage src={"https://github.com/shadcn.png"} />
          <AvatarFallback>USER</AvatarFallback>
        </Avatar>
        
         <div className='flex flex-col items-start '>
              <p className='text-sm font-light'>{props.username}</p>
              <h1 className=''>{`${props.title}`}</h1>
              <div className='flex gap-x-5 '>
              <p className='text-sm font-light'>{getTimeDifference(props.created_date)}</p>
              {(userId==props.userId) && ( <DeleteDiscussionPopUp apiId={props.apiId} discussionId={discussion?.data.id}/>)}

              </div>
         </div>
       </div>
      </AccordionTrigger>
      <AccordionContent className='p-5 flex flex-col gap-y-7'>
        <div className='flex flex-col '>
        <h1 className='text-primary sm:text-xl text-lg font-bold' >
                    Question:
                 </h1>
                  <h1 className='sm:text-xl text-lg' style={{ whiteSpace: 'pre-line' }}>
                    {discussion?.data.question}
                 </h1>
        </div>
        <h1 className='text-primary sm:text-xl text-lg font-bold' >
                    Réponses:
                 </h1>
        <div className='flex flex-col gap-y-2 items-center'>
                {/**I got some weird errors when i added the pagination i ll try to fix them later */}
              {discussion?.data.answers && (discussion.data.answers/*slice(startIndex, endIndex)*/.map((answer:Answer,key:number)=>(
                <AnswerDetails 
                username={`${answer.user.firstname} ${answer.user.lastname}`} 
                answer={answer.answer} 
                created_date={answer.created_at} 
                votes={answer.votes}
                userId={answer.user.id}
                apiId={props.apiId}
                discussionId={answer.discussion_id}
                answerId={answer.id}
                />
               
              )))}
            {/*discussion?.data.answers.length ?  (<PaginationBar rowsPerPage={rowsPerPage} startIndex={startIndex} endIndex={endIndex}
            setRefresh={setRefresh}  setStartIndex={setStartIndex} setEndIndex={setEndIndex} length={discussion?.data.answers.length ? Math.ceil(discussion?.data.answers.length / rowsPerPage)*rowsPerPage :0}/>) : null*/}  
        </div>         
                    <AddAnswerForm  apiId={props.apiId} id={discussion?.data.id}/>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
  )
}

export default DisscussionDetails