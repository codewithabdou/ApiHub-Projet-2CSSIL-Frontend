"use server";

import { API_INFO } from "@config";
import { ErrorType } from "@typings/entities/Error";
import { cookies } from "next/headers";

async function revenuePerMonth(year:string): Promise<{
    data: Array<{
      year: number;
      month: number;
      total_revenues: number;
    }>;
  } | ErrorType> {
  const userCookie = cookies().get("user")?.value;
  try {
    const response = await fetch(
      `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.GENERAL.GET_APIS}/subscriptions/revenue/month?year=${year}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:userCookie ? userCookie : "",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const result = await response.json();
    console.log(result);
    
    return result.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
        message:"fetching error",
        status:"error"
    } as ErrorType;
  }
}

export default revenuePerMonth;
