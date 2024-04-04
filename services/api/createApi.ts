"use server";
import { API_INFO } from "@config";
import {
  createApiRequest,
  errorCreateApiResponse,
  successCreateApiResponse,
} from "@typings/api/createApiTypes";
import { cookies } from "next/headers";
<<<<<<< HEAD
<<<<<<< HEAD
async function createApi(
  formData: createApiRequest
): Promise<successCreateApiResponse | errorCreateApiResponse> {
  try {
    const formdatajson = JSON.stringify(formData);
    const accessToken = cookies().get("user")?.value;
    const response = await fetch(
      `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.CREATEAPI}`,
      {
        method: "POST",
        body: formdatajson,
        headers: {
          Authorization: ` ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (!data?.Authorization) {
      return data as errorCreateApiResponse;
    } else return data as successCreateApiResponse;
  } catch (error: any) {
    return {
      status: "server error",
      message: error.message || "An unexpected server error occurred",
    } as errorCreateApiResponse;
  }
=======
async function createApi(formData:createApiRequest):Promise<number | errorCreateApiResponse>
=======
async function createApi(formData:createApiRequest):Promise<{data:number,status:string,message:string} | errorCreateApiResponse>
>>>>>>> c0af9dfde36912ae31de23f0dae7a2b2eb3b5e4d
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
          const data =  response.status;
         
          return {data:data,status:"success",message:"api created succesfully"} ;
    }catch (error:any){
        return {
            status: "server error",
            message: error.message || "An unexpected server error occurred",
          } ;
    }
>>>>>>> 393243ffe77bb9811e4f06bb68e600f528e04e88
}
export default createApi;
