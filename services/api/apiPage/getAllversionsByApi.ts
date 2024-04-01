"use server"
import { API_INFO } from "@config";
import { errorGetVersionsResponse, successGetVersionsResponse } from "@typings/api/getVersionsTypes";
import { cookies } from "next/headers";

async function getAllVersionsByApi(id:Number):Promise<successGetVersionsResponse|errorGetVersionsResponse>{
    try {
        const accessToken = cookies().get("user")?.value;
        const response=await fetch(
            `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.GENERAL.GET_APIS}/${id}/versions`,
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
            return data as errorGetVersionsResponse;
          }else 
          return data as successGetVersionsResponse;
    } catch (error:any) {
        return {
            status: "server error",
            message: error.message || "An unexpected server error occurred",
          } as errorGetVersionsResponse;
    }
}
export default getAllVersionsByApi