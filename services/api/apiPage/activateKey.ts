"use server";

import { API_INFO } from "@config";
import { cookies } from "next/headers";

async function activateKey(key:{key: string}): Promise<boolean> {
  const userCookie = cookies().get("user")?.value;
  const keyValue=JSON.stringify(key);
  if (!userCookie?.length) return false;
  try {
    const response = await fetch(
      `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.GENERAL.GET_APIS}/api-keys/activate`,
      {
        method: "PATCH",
        body:keyValue,
        headers: {
          "Content-Type": "application/json",
          Authorization: userCookie,
        },
      }
    );

    return true;
  } catch (error) {
    return false;
  }
}

export default activateKey;
