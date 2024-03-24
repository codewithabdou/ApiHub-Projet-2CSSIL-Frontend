"use server";
import { API_INFO } from "@config";
import {
  SuccessGetUsersResponse,
  ErrorGetUsersResponse,
} from "@typings/api/getUsers";
import { cookies } from "next/headers";

const getSuppliers = async (page: string) => {
  const userCookie = cookies().get("user")?.value;

  if (!userCookie?.length)
    return {
      status: "error",
      message: "User not found or not active",
    };

  try {
    const res = await fetch(
      `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.ADMIN.GET_USERS}/?page=${page}&roles=supplier`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: userCookie,
        },
        next: {
          tags: ["UsersListManagement"],
        },
      }
    );
    const data = await res.json();
    if (data.status !== "success") {
      return {
        status: "error",
        message: data.error,
      } as ErrorGetUsersResponse;
    }
    return data as SuccessGetUsersResponse;
  } catch (error: any) {
    return {
      status: "error",
      message: error.message || "An error occurred while fetching data",
    } as ErrorGetUsersResponse;
  }
};

export default getSuppliers;
