"use server";

import { cookies } from "next/headers";

import { API_INFO } from "@config";
import {
  createSupplierRequest,
  errorcreateSupplierrResponse,
  successcreateSupplierrResponse,
} from "@typings/api/addSupplierForm";

async function createSupplier(
  formData: createSupplierRequest
): Promise<errorcreateSupplierrResponse | successcreateSupplierrResponse> {
  const formdatajson = JSON.stringify(formData);
  const userCookie = cookies().get("user")?.value;

  try {
    const response = await fetch(
      `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.CREATESUPPLIER}`,
      {
        method: "POST",
        body: formdatajson,
        headers: {
          "Content-Type": "application/json",
          Authorization: userCookie || "",
        },
      }
    );

    const data = await response.json();

    if (data.status !== "success") {
      return data as errorcreateSupplierrResponse;
    } else {
      return data as successcreateSupplierrResponse;
    }
  } catch (error: any) {
    return {
      status: "server error",
      message: error.message || "An unexpected server error occurred",
    } as errorcreateSupplierrResponse;
  }
}
export { createSupplier };
