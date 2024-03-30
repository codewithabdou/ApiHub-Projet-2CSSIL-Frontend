"use server";
import { API_INFO } from "@config";
import {
  SuccessGetUsersResponse,
  ErrorGetUsersResponse,
} from "@typings/api/getUsers";
import { cookies } from "next/headers";

const getUsers = async (page: string) => {
  const userCookie = cookies().get("user")?.value;

  if (!userCookie?.length)
    return {
      status: "error",
      message: "User not found or not active",
    };

  try {
    const res = await fetch(
      `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.ADMIN.GET_USERS}/?page=${page}&roles=user&per_page=5`,
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
    return { ...data, status: "success" } as SuccessGetUsersResponse;
  } catch (error: any) {
    return {
      status: "error",
      message: error.message || "An error occurred while fetching data",
    } as ErrorGetUsersResponse;
  }
};

export default getUsers;
