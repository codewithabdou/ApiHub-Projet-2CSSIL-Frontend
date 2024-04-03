"use server"
import { API_INFO } from "@config";
import { createDisscussionRequest,  successCreateDiscussionResponse } from "@typings/api/disscussionTypes";
import { ErrorType } from "@typings/entities/Error";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
async function createDisscussion(formData:createDisscussionRequest,apiId:number):Promise<successCreateDiscussionResponse | ErrorType>
{
    try{
        const formdatajson = JSON.stringify(formData);
        const accessToken = cookies().get("user")?.value;
        const response = await fetch(
            `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.GENERAL.GET_APIS}/${apiId}/discussions`,
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
          revalidateTag("getAllDiscussions");
         
          return data as successCreateDiscussionResponse ;
    }catch (error:any){
        return {
            status: "server error",
            message: error.message || "An unexpected server error occurred",
          } as ErrorType ;
    }
}
export default createDisscussion;