"use server";

import { API_INFO } from "@config";
import { cookies } from "next/headers";

async function usersStats(): Promise<{
    users_number: number,
    suppliers_number: number,
    admins_number: number
  } > {
  const userCookie = cookies().get("user")?.value;
  try {
    const response = await fetch(
      `${API_INFO.API_BASE_URL}/users/statistics`,
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
    
    return result.data as{
        users_number: number,
        suppliers_number: number,
        admins_number: number
      };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
        users_number: -1,
        suppliers_number: -1,
        admins_number: -1
      };
  }
}

export default usersStats;
