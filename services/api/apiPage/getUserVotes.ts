"use server"
import { API_INFO } from "@config";
import { createDisscussionRequest, errorCreateDiscussionResponse, Disscussion, successCreateDiscussionResponse } from "@typings/api/disscussionTypes";
import { cookies } from "next/headers";
async function getUserVotes(apiId:number,discussionId:number,answerId:number):Promise<{data:any,status:string } | errorCreateDiscussionResponse>
{
    try{
        
        const accessToken = cookies().get("user")?.value;
        const response = await fetch(
            `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.GENERAL.GET_APIS}/${apiId}/discussions/${discussionId}/answers/${answerId}/votes`,
            {
              method: "GET",
             
              headers: {
                'Authorization': ` ${accessToken}`,
                "Content-Type": "application/json",
              },
              next:{
                tags: ["getVotes"]
              }
            }
          );
          const data = await response.json();
          const code=response.status;
          
          if (code===200) {
            return {data:data,status:"success"} as {data:any,status:string }
          }else {
            return data as errorCreateDiscussionResponse
          }
    }catch (error:any){
        return {
            status: "server error",
            message: error.message || "An unexpected server error occurred",
          } as errorCreateDiscussionResponse ;
    }
}
export default getUserVotes;