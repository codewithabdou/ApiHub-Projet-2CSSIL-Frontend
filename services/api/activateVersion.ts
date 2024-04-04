"use server";

import { API_INFO } from "@config";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

async function activateVersion({
  apiId,
  version,
}: {
  apiId: string;
  version: string;
}): Promise<boolean> {
  const userCookie = cookies().get("user")?.value;

  if (!userCookie?.length) return false;
  try {
    const response = await fetch(
      `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.SUPPLIER.ACTIVATE_VERSION[0]}/${apiId}${API_INFO.API_ENDPOINTS.SUPPLIER.ACTIVATE_VERSION[1]}/${version}${API_INFO.API_ENDPOINTS.SUPPLIER.ACTIVATE_VERSION[2]}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: userCookie,
        },
      }
    );
    revalidateTag("MyApisVersionsListManagement");

    return true;
  } catch (error) {
    return false;
  }
}

export default activateVersion;
