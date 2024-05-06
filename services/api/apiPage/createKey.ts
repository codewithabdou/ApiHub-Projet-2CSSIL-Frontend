"use server";

import { API_INFO } from "@config";
import buildUrl from "@helpers/buildUrl";
import { keysResponse } from "@typings/api/keys";
import { ErrorType } from "@typings/entities/Error";
import { cookies } from "next/headers";



const createKey = async (subId:number) => {

  const userCookie = cookies().get("user")?.value;
  if (!userCookie?.length)
    return {
      status: "error",
      message: "User not found or not active",
    };
  const url = buildUrl(
    API_INFO.API_BASE_URL,
    `${API_INFO.API_ENDPOINTS.GENERAL.GET_APIS}/subscriptions/${subId}/api-keys/create`,
    
  );

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userCookie,
      },
     
    });

    
      return { status: "success" }
    
  } catch (error: any) {
    return {
      status: "error",
      message: error.message || "An error occurred while fetching data",
    } as ErrorType;
  }
};

export default createKey;
