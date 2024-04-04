"use server"
import { API_INFO } from "@config";
import { successGetApiByIdResponse } from "@typings/api/getApiByIdTypes";
import { ErrorType } from "@typings/entities/Error";
import { cookies } from "next/headers";
async function getApiById(id:Number):Promise<{data:successGetApiByIdResponse,status:string,message:string} | ErrorType>
{
    try{
        const accessToken = cookies().get("user")?.value;
        const response = await fetch(
            `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.GENERAL.GET_APIS}/${id}`,
            {
              method: "GET",
              headers: {
                'Authorization': ` ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          return {data:data,status:"success",message:"got api succesfully"} ;
    }catch (error:any){
        return {
            status: "server error",
            message: error.message || "An unexpected server error occurred",
          } as ErrorType;
    }
}
export default getApiById;