"use server"
import { API_INFO } from "@config";
import { ErrorType } from "@typings/entities/Error";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
async function deleteVote(apiId:number,discussionId:number,answerId:number):Promise<{data:number,status:string,message:string} | ErrorType>
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
          const data =  response.status;
          revalidateTag("getVotes");
          return  {data:data,status:"success",message:"vote deleted succesfully"} ;
    }catch (error:any){
        return {
            status: "server error",
            message: error.message || "An unexpected server error occurred",
          } as ErrorType ;
    }
}
export default deleteVote;