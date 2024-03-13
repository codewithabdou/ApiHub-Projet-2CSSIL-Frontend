"use server";
import { API_INFO } from "@config";
import {
  SuccessGetUsersResponse,
  ErrorGetUsersResponse,
} from "@typings/api/getUsers";
import { cookies } from "next/headers";

const getUsers = async (
  page: string
): Promise<SuccessGetUsersResponse | ErrorGetUsersResponse> => {
  const userCookie = cookies().get("user")?.value;

  if (!userCookie?.length)
    return {
      status: "error",
      message: "User not found or not active",
    };
  try {
    const res = await fetch(
      `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.ADMIN.GET_USERS}/?per_page=10&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: userCookie,
        },
      }
    );
    const data: SuccessGetUsersResponse = await res.json();
    return data;
  } catch (error) {
    return {
      status: "error",
      message: "An error occurred while fetching users",
    };
  }
};

export default getUsers;
