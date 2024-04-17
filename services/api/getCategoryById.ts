"use server"
import { API_INFO } from "@config";
import { successGetApiByIdResponse } from "@typings/api/getApiByIdTypes";
import { ErrorType } from "@typings/entities/Error";
import { cookies } from "next/headers";
async function getCategoryById(id:Number):Promise<{data:any,status:string,message:string} | ErrorType>
{
    try{
        const response = await fetch(
            `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.CATEGORIES.GET_CATEGORY_BY_ID}/${id}`,
            {
                
              method: "GET",

            }
          );
          const data = await response.json();
          return {data:data.data,status:"success",message:"got category succesfully"} ;
    }catch (error:any){
        return {
            status: "server error",
            message: error.message || "An unexpected server error occurred",
          } as ErrorType;
    }
}
export default getCategoryById;