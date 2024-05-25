"use server";

import { API_INFO } from "@config";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

async function deactivateUser(userId: string): Promise<boolean> {
  const userCookie = cookies().get("user")?.value;

  if (!userCookie?.length) return false;
  try {
    const response = await fetch(
      `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.ADMIN.DEACTIVATE_USER[0]}/${userId}${API_INFO.API_ENDPOINTS.ADMIN.DEACTIVATE_USER[1]}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: userCookie,
        },
      }
    );
    const data = await response.json();
    if (data.user_status !== "suspended") {
      return false;
    }
    revalidateTag("UsersListManagement");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export default deactivateUser;
