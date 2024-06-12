"use server";

import { API_INFO } from "@config";
import { cookies } from "next/headers";

async function usersNumber(): Promise<number> {
  const userCookie = cookies().get("user")?.value;
  try {
    const response = await fetch(
      `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.GENERAL.GET_APIS}/mine/users/count`,
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
    
    return result.data.users_number;
  } catch (error) {
    console.error("Error fetching data:", error);
    return -1;
  }
}

export default usersNumber;
