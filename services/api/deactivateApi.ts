"use server";

import { API_INFO } from "@config";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

async function deactivateApi(apiId: string): Promise<boolean> {
  const userCookie = cookies().get("user")?.value;

  if (!userCookie?.length) return false;
  try {
    const response = await fetch(
      `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.SUPPLIER.DEACTIVATE_API[0]}/${apiId}${API_INFO.API_ENDPOINTS.SUPPLIER.DEACTIVATE_API[1]}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: userCookie,
        },
      }
    );
    revalidateTag("MyApisListManagement");

    return true;
  } catch (error) {
    return false;
  }
}

export default deactivateApi;
