"use server";
import { API_INFO } from "@config";
import { errortTicketRes, successtTicketRes, ticketFormRequest } from "@typings/api/createTicketType";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

 const replyToTicket = async (
  reply: {response:string} , 
  apiId : number , 
  ticketId : number 
): Promise<errortTicketRes | successtTicketRes> => {
  try {
    const userCookie = cookies().get("user")?.value;

    if (!userCookie?.length)
      return {
        status: "error",
        message: "User not found or not active",
      };

    const res = await fetch(
      `${API_INFO.API_BASE_URL}/apis/${apiId}/tickets/${ticketId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: userCookie,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reply),
      }
    );
    if (res.ok){
      revalidateTag("getAllTickets");
      return {status : "success" , data : await res.json()} as successtTicketRes;
    }
    else {
      let error =await  res.json();
      return {status : "error" , ... error } as errortTicketRes;
    }
  } catch (error) {
    return {
      status: "error",
      message: "An error occurred while creating category",
    };
  }
};

export default replyToTicket;