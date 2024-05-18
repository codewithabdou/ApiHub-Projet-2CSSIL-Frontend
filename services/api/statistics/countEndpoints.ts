"use server";

import { API_INFO } from "@config";
import { cookies } from "next/headers";

async function endpointsCount(apiId:number): Promise<number> {
  const userCookie = cookies().get("user")?.value;
  try {
    const response = await fetch(
      `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.GENERAL.GET_APIS}/mine/${apiId}/endpoints/count`,
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
    
    return result.data.endpoints_number;
  } catch (error) {
    console.error("Error fetching data:", error);
    return -1;
  }
}

export default endpointsCount;
