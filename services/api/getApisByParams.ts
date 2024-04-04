"use server";

import { API_INFO } from "@config";
import {
  ErrorGetAPIsResponse,
  SuccessGetAPIsResponse,
} from "@typings/api/getAPIs";
import { cookies } from "next/headers";

function buildUrl(baseUrl: string, endpoint: string, params = {}) {
  const url = `${baseUrl}${endpoint}`;
  const searchParams = new URLSearchParams();

  // Loop through each parameter key-value pair
  for (const [key, value] of Object.entries(params)) {
    // Check if value is defined before adding
    if (value !== undefined) {
      searchParams.append(key, value?.toString() || "");
    }
<<<<<<< HEAD
=======
  
    return url + (searchParams.toString() ? `?${searchParams.toString()}` : "");
  }
  interface GetAPIsOptions {
    page?: number;
    category_ids?: number;
    status?: string;
    per_page?: number;
    supplierId?:string;
>>>>>>> 393243ffe77bb9811e4f06bb68e600f528e04e88
  }

  return url + (searchParams.toString() ? `?${searchParams.toString()}` : "");
}
interface GetAPIsOptions {
  page?: number;
  category_ids?: number;
  status?: string;
  per_page?: number;
  supplierId?: number;
}

const getAPIs = async (options: GetAPIsOptions = {}) => {
  const { page, category_ids, status, per_page, supplierId } = options;

  const userCookie = cookies().get("user")?.value;
  if (!userCookie?.length)
    return {
      status: "error",
      message: "User not found or not active",
    };

  const url = buildUrl(
    API_INFO.API_BASE_URL,
    API_INFO.API_ENDPOINTS.GENERAL.GET_APIS,
    options
  );

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: userCookie,
      },
      next: {
        tags: ["ApisListManagement"],
      },
    });
    const data = await res.json();
    if (data.status !== "error") {
      return data as SuccessGetAPIsResponse;
    }
    return {
      status: "error",
      message: data.error,
    } as ErrorGetAPIsResponse;
  } catch (error: any) {
    return {
      status: "error",
      message: error.message || "An error occurred while fetching data",
    } as ErrorGetAPIsResponse;
  }
};

export default getAPIs;
