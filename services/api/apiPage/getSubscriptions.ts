"use server";

import { API_INFO } from "@config";
import buildUrl from "@helpers/buildUrl";
import {
  ErrorGetAPIsResponse,
  SuccessGetAPIsResponse,
} from "@typings/api/getAPIs";
import { SubscriptionResponse } from "@typings/api/subscriptionTypes";
import { ErrorType } from "@typings/entities/Error";
import { cookies } from "next/headers";

interface GetSubsOptions {
  page?: number;
  api_id?: number;
  expired?: string;
  per_page?: number;
}

const getSubs = async (options: GetSubsOptions = {}) => {

  const userCookie = cookies().get("user")?.value;
  if (!userCookie?.length)
    return {
      status: "error",
      message: "User not found or not active",
    };
  const url = buildUrl(
    API_INFO.API_BASE_URL,
    `${API_INFO.API_ENDPOINTS.GENERAL.GET_APIS}/subscriptions/mine`,
    options
  );

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: userCookie,
      },
     
    });
    const data = await res.json();

    console.log(data);
    
      return { ...data, status: "success" } as SubscriptionResponse;
    
  } catch (error: any) {
    return {
      status: "error",
      message: error.message || "An error occurred while fetching data",
    } as ErrorType;
  }
};

export default getSubs;
