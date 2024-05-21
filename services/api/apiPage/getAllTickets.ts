"use server"
import { API_INFO } from "@config";
import { ErrorType } from "@typings/entities/Error";
import Ticket from "@typings/entities/Ticket";
import { cookies } from "next/headers";

export async function  getAllTickets(apiId: number) :Promise<{data:Ticket[],status:string,message:string} | ErrorType > {

  try{
        
    const accessToken = cookies().get("user")?.value;
    const response = await fetch(
        `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.GENERAL.GET_APIS}/${apiId}/tickets`,
        {
          method: "GET",
         
          headers: {
            'Authorization': ` ${accessToken}`,
            "Content-Type": "application/json",
          },
          
          next: {
            tags: ["getAllTickets"],
          },
        }
      );
      const data = await response.json();
      return {data:data.data,status:"success",message:"got all tickets succesfully"} ;
}catch (error:any){
    return {
        status: "server error",
        message: error.message || "An unexpected server error occurred",
      } as ErrorType ;
}
}