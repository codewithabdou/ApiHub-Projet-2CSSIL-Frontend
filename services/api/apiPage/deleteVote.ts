"use server"
import { API_INFO } from "@config";
import { createDisscussionRequest, errorCreateDiscussionResponse, Disscussion, successCreateDiscussionResponse } from "@typings/api/disscussionTypes";
import { cookies } from "next/headers";
async function deleteVote(apiId:number,discussionId:number,answerId:number):Promise<number | errorCreateDiscussionResponse>
{
    try{
        
        const accessToken = cookies().get("user")?.value;
        const response = await fetch(
            `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.GENERAL.GET_APIS}/${apiId}/discussions/${discussionId}/answers/${answerId}/votes`,
            {
              method: "DELETE",
             
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
          return data  ;
    }catch (error:any){
        return {
            status: "server error",
            message: error.message || "An unexpected server error occurred",
          } as errorCreateDiscussionResponse ;
    }
}
export default deleteVote;