"use server"
import { API_INFO } from "@config";
import { Disscussion } from "@typings/api/disscussionTypes";
import { ErrorType } from "@typings/entities/Error";
import { cookies } from "next/headers";
async function getAllDiscussions(apiId:number):Promise<{data:Disscussion[],status:string,message:string} | ErrorType>
{   

    try{
        
        const accessToken = cookies().get("user")?.value;
        const response = await fetch(
            `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.GENERAL.GET_APIS}/${apiId}/discussions`,
            {
              method: "GET",
             
              headers: {
                'Authorization': ` ${accessToken}`,
                "Content-Type": "application/json",
              },
              next: {
                tags: ["getAllDiscussions"],
              },
            }
          );
          const data = await response.json();
          return {data:data.data,status:"success",message:"got all discussions succesfully"} ;
    }catch (error:any){
        return {
            status: "server error",
            message: error.message || "An unexpected server error occurred",
          } as ErrorType ;
    }
}
export default getAllDiscussions;