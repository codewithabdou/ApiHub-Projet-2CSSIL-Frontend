"use server"
import { API_INFO } from "@config";
import { createApiRequest, errorCreateApiResponse, successCreateApiResponse } from "@typings/api/createApiTypes";
import { cookies } from "next/headers";
async function createApi(formData:createApiRequest):Promise<successCreateApiResponse | errorCreateApiResponse>
{
    try{
        const formdatajson = JSON.stringify(formData);
        const accessToken = cookies().get("user")?.value;
        const response = await fetch(
            `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.CREATEAPI}`,
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
          if (!data?.Authorization) {
            return data as errorCreateApiResponse;
          }else 
          return data as successCreateApiResponse;
    }catch (error:any){
        return {
            status: "server error",
            message: error.message || "An unexpected server error occurred",
          } as errorCreateApiResponse;
    }
}
export default createApi;