"use server"
import { API_INFO } from "@config";
import { successGetVersionDetailsResponse } from "@typings/api/getVersionDetailsTypes";
import { ErrorType } from "@typings/entities/Error";
import { cookies } from "next/headers";

async function getVersionDetails(id:Number,version:String):Promise<{data:successGetVersionDetailsResponse,status:string,message:string} | ErrorType> {
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
          
          return {data:data,status:"success",message:"got version succesfully"} ;
    } catch (error:any) {
        return {
            status: "server error",
            message: error.message || "An unexpected server error occurred",
          } as ErrorType;
    }
}
export default getVersionDetails