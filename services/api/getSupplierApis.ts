"use server";

import { API_INFO } from "@config";
import {
  ErrorGetAPIsResponse,
  SuccessGetAPIsResponse,
} from "@typings/api/getAPIs";
import { cookies } from "next/headers";

const getSupplierAPIs = async (page: string) => {
  const userCookie = cookies().get("user")?.value;

  if (!userCookie?.length)
    return {
      status: "error",
      message: "User not found or not active",
    };

  try {
    const res = await fetch(
      `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.SUPPLIER.GET_MY_APIS}?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: userCookie,
        },
        next: {
          tags: ["MyApisListManagement"],
        },
      }
    );

    const data = await res.json();

    return { ...data, status: "success" } as SuccessGetAPIsResponse;
  } catch (error: any) {
    return {
      status: "error",
      message: error.message || "An error occurred while fetching data",
    } as ErrorGetAPIsResponse;
  }
};

export default getSupplierAPIs;
