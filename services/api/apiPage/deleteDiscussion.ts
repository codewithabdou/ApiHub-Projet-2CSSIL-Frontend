"use server"
import { API_INFO } from "@config";
import { errorCreateDiscussionResponse } from "@typings/api/disscussionTypes";
import { ErrorType } from "@typings/entities/Error";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
async function deleteDiscussion(apiId:number,discussionId:number):Promise<{data:number,status:string,message:string} | ErrorType>
{
    try{
        
        const accessToken = cookies().get("user")?.value;
        const response = await fetch(
            `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.GENERAL.GET_APIS}/${apiId}/discussions/${discussionId}`,
            {
              method: "DELETE",
             
              headers: {
                'Authorization': ` ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const data =  response.status;
          revalidateTag("getAllDiscussion");
         
          return {data:data,status:"success",message:"discussion deleted succesfully"}  ;
    }catch (error:any){
        return {
            status: "server error",
            message: error.message || "An unexpected server error occurred",
          } as ErrorType ;
    }
}
export default deleteDiscussion