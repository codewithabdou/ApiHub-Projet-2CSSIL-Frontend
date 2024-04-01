"use server"
import { API_INFO } from "@config";
import { errorGetApiByIdResponse, successGetApiByIdResponse } from "@typings/api/getApiByIdTypes";
import { cookies } from "next/headers";
async function getApiById(id:Number):Promise<successGetApiByIdResponse | errorGetApiByIdResponse>
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
          if (!data?.Authorization) {
            return data as errorGetApiByIdResponse;
          }else 
          return data as successGetApiByIdResponse;
    }catch (error:any){
        return {
            status: "server error",
            message: error.message || "An unexpected server error occurred",
          } as errorGetApiByIdResponse;
    }
}
export default getApiById;