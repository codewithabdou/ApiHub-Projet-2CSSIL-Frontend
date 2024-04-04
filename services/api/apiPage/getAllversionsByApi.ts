"use server";
import { API_INFO } from "@config";
import { successGetVersionsResponse } from "@typings/api/getVersionsTypes";
import { ErrorType } from "@typings/entities/Error";
import { cookies } from "next/headers";

async function getAllVersionsByApi(
  id: Number
): Promise<
  | { data: successGetVersionsResponse; status: string; message: string }
  | ErrorType
> {
  try {
    const accessToken = cookies().get("user")?.value;
    const response = await fetch(
      `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.GENERAL.GET_APIS}/${id}/versions`,
      {
        method: "GET",
        headers: {
          Authorization: ` ${accessToken}`,
          "Content-Type": "application/json",
        },
        next: {
          tags: ["MyApisVersionsListManagement"],
        },
      }
    );
    const data = await response.json();

    return {
      data: data,
      status: "success",
      message: "got all versions succesfully",
    };
  } catch (error: any) {
    return {
      status: "server error",
      message: error.message || "An unexpected server error occurred",
    } as ErrorType;
  }
}
export default getAllVersionsByApi;
