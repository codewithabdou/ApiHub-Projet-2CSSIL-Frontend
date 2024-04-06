"use server";

import { API_INFO } from "@config";
import {
  createAPIVersionRequest,
  successCreateAPIVersionResponse,
  errorCreateAPIVersionResponse,
} from "@typings/api/createAPIVersionForm";
import { cookies } from "next/headers";

async function createApiVersion({
  payload,
  id,
}: {
  payload: createAPIVersionRequest;
  id: number;
}): Promise<successCreateAPIVersionResponse | errorCreateAPIVersionResponse> {
  try {
    const formdatajson = JSON.stringify(payload);
    const accessToken = cookies().get("user")?.value;
    const response = await fetch(
      `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.CREATEAPIVERSION[0]}/${id}${API_INFO.API_ENDPOINTS.CREATEAPIVERSION[1]}`,
      {
        method: "POST",
        body: formdatajson,
        headers: {
          Authorization: ` ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return {
      status: "success",
      message: "API version created successfully",
    } as successCreateAPIVersionResponse;
  } catch (error: any) {
    return {
      status: "server error",
      message: error.message || "An unexpected server error occurred",
    } as errorCreateAPIVersionResponse;
  }
}

export { createApiVersion };
