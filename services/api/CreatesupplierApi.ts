"use server";

import { cookies } from "next/headers";

import { API_INFO } from "@config";
import {
  createSupplierRequest,
  errorcreateSupplierrResponse,
  successcreateSupplierrResponse,
} from "@typings/api/addSupplierForm";
import { revalidateTag } from "next/cache";

async function createSupplier(
  formData: createSupplierRequest
): Promise<errorcreateSupplierrResponse | successcreateSupplierrResponse> {
  const formdatajson = JSON.stringify(formData);
  console.log(formData)
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

    const data = response.status;

    revalidateTag("UsersListManagement");
    return {
      status: "success",
      message: "Supplier created succesfully",
    };
  } catch (error: any) {
    return {
      status: "error",
      message: error.message || "An unexpected server error occurred",
    } as errorcreateSupplierrResponse;
  } 

  
}
export { createSupplier };
