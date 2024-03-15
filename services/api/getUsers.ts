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
    const data: SuccessGetUsersResponse = await res.json();
    return data;
  } catch (error) {
    return {
      status: "error",
      message: "An error occurred while fetching users",
    } as ErrorGetUsersResponse;
  }
};

export default getUsers;
