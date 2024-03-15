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
  const res = await fetch(
    `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.ADMIN.GET_USERS}/?page=${page}&roles=user`,
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
};

export default getUsers;
