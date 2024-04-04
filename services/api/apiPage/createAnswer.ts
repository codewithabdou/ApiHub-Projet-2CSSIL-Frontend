"use server"
import { API_INFO } from "@config";
import { createAnswerRequest, errorCreateDiscussionResponse, Answer } from "@typings/api/disscussionTypes";
import { cookies } from "next/headers";
async function createAnswer(formData:createAnswerRequest,apiId:number,id:number):Promise<{data:Answer} | errorCreateDiscussionResponse>
{
    try{
        const formdatajson = JSON.stringify(formData);
        const accessToken = cookies().get("user")?.value;
        const response = await fetch(
            `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.GENERAL.GET_APIS}/${apiId}/discussions/${id}/answers`,
            {
              method: "POST",
              body: formdatajson,
              headers: {
                'Authorization': ` ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          if (!data?.Authorization) {
            return data as errorCreateDiscussionResponse ;
          }else 
          return data as {data:Answer} ;
    }catch (error:any){
        return {
            status: "server error",
            message: error.message || "An unexpected server error occurred",
          } as errorCreateDiscussionResponse ;
    }
}
export default createAnswer;