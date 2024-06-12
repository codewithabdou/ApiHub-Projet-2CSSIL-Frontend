"use server"
import { API_INFO } from "@config";
import { createAnswerRequest, Answer } from "@typings/api/disscussionTypes";
import { ErrorType } from "@typings/entities/Error";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
async function purchaseApi(backUrl:string,apiId:number,planName:string):Promise<{checkout_url:string} | ErrorType>
{
    try{
        const accessToken = cookies().get("user")?.value;
        const response = await fetch(
            `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.GENERAL.GET_APIS}/${apiId}/${planName}/chargily/checkout?redirect_url=${backUrl}`,
            {
              method: "POST",
              headers: {
                'Authorization': ` ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          return data as {checkout_url:string};
    }catch (error:any){
        return {
            status: "server error",
            message: error.message || "An unexpected server error occurred",
          } as ErrorType ;
    }
}
export default purchaseApi;