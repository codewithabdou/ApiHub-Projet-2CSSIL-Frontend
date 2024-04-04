"use server"
import { API_INFO } from "@config";
import { errorCreateDiscussionResponse,  successCreateDiscussionResponse } from "@typings/api/disscussionTypes";
import { ErrorType } from "@typings/entities/Error";
import { cookies } from "next/headers";
async function getDiscussion(apiId:number,discussionId:number):Promise<{data:successCreateDiscussionResponse,status:string,message:string} | ErrorType>
{ console.log("called get dis");

    try{
        
        const accessToken = cookies().get("user")?.value;
        const response = await fetch(
            `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.GENERAL.GET_APIS}/${apiId}/discussions/${discussionId}`,
            {
              method: "GET",
             
              headers: {
                'Authorization': ` ${accessToken}`,
                "Content-Type": "application/json",
              },
              next: {
                tags: ["getDiscussion"],
              },
            }
          );
          const data = await response.json();
          
          return {data:data,status:"success",message:"got discussion succesfully"} ;
    }catch (error:any){
        return {
            status: "server error",
            message: error.message || "An unexpected server error occurred",
          } as ErrorType ;
    }
}
export default getDiscussion;