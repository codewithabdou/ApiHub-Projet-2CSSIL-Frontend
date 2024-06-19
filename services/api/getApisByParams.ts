"use server";

import { API_INFO } from "@config";
import buildUrl from "@helpers/buildUrl";
import {
  ErrorGetAPIsResponse,
  SuccessGetAPIsResponse,
} from "@typings/api/getAPIs";
import { cookies } from "next/headers";

interface GetAPIsOptions {
  page?: number;
  categoryIds?: number;
  status?: string;
  per_page?: number;
  supplierId?: number;
}

const getAPIs = async (options: GetAPIsOptions = {}) => {
  const { page, categoryIds, status, per_page, supplierId } = options;

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

    if (data.data) {
      return { ...data, status: "success" } as SuccessGetAPIsResponse;
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
