"use server"
import { API_INFO } from "@config";
import { errorGetVersionDetailsResponse, successGetVersionDetailsResponse } from "@typings/api/getVersionDetailsTypes";
import { cookies } from "next/headers";

async function getVersionDetails(id:Number,version:String):Promise<successGetVersionDetailsResponse|errorGetVersionDetailsResponse> {
    const accessToken = cookies().get("user")?.value;

    try {
        const response=await fetch(
            `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.GENERAL.GET_APIS}/${id}/versions/${version}`,
            {
                method:"GET",
                headers:{
                    'Authorization': ` ${accessToken}`,
                "Content-Type": "application/json",
                }
            }
            
        )
        const data = await response.json();
          if (!data?.Authorization) {
            return data as errorGetVersionDetailsResponse;
          }else 
          return data as successGetVersionDetailsResponse;
    } catch (error:any) {
        return {
            status: "server error",
            message: error.message || "An unexpected server error occurred",
          } as errorGetVersionDetailsResponse;
    }
}
export default getVersionDetails