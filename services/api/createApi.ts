"use server";
import { API_INFO } from "@config";
import {
  createApiRequest,
  errorCreateApiResponse,
  successCreateApiResponse,
} from "@typings/api/createApiTypes";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

async function createApi(
  formData: createApiRequest
): Promise<
  { data: number; status: string; message: string } | errorCreateApiResponse
> {
  try {
    const formdatajson = JSON.stringify(formData);
    const accessToken = cookies().get("user")?.value;
    const response = await fetch(
      `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.CREATEAPI}`,
      {
        method: "POST",
        body: formdatajson,
        headers: {
          Authorization: ` ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.status;
    revalidateTag("MyApisListManagement");
    return {
      data: data,
      status: "success",
      message: "api created succesfully",
    };
  } catch (error: any) {
    return {
      status: "error",
      message: error.message || "An unexpected server error occurred",
    };
  }
}
export default createApi;
