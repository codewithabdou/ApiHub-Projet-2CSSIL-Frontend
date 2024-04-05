"use server";
import { API_INFO } from "@config";
import { cookies } from "next/headers";
import User from "@typings/entities/User";
import {
  loginRequest,
  registerRequest,
  errorAuthResponse,
  successLoginResponse,
  successRegisterResponse,
} from "@typings/auth/authForms";
import { revalidateTag } from "next/cache";

async function login(
  formData: loginRequest
): Promise<errorAuthResponse | successLoginResponse> {
  try {
    const formdatajson = JSON.stringify(formData);
    const response = await fetch(
      `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.LOGIN}`,
      {
        method: "POST",
        body: formdatajson,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (!data?.Authorization) {
      return data as errorAuthResponse;
    } else {
      cookies().set("user", data.Authorization);
      const user = await getLoggedInUser();

      if (user) {
        cookies().set("role", user.role);
        return {
          userId: user.id,
          status: "success",
          message: user.role,
        } as successLoginResponse;
      } else {
        return {
          status: "server error",
          message: "user not found or not active",
        } as errorAuthResponse;
      }
    }
  } catch (error: any) {
    return {
      status: "server error",
      message: error.message || "An unexpected server error occurred",
    } as errorAuthResponse;
  }
}

async function logout() {
  cookies().set("user", "");
  cookies().set("role", "");
  revalidateTag("user");
}

async function register(
  formData: registerRequest
): Promise<errorAuthResponse | successRegisterResponse> {
  const formdatajson = JSON.stringify(formData);

  try {
    const response = await fetch(
      `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.REGISTER}`,
      {
        method: "POST",
        body: formdatajson,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return { status: "success" } as successRegisterResponse;
  } catch (error: any) {
    return {
      status: "server error",
      message: error.message || "An unexpected server error occurred",
    } as errorAuthResponse;
  }
}

async function getLoggedInUser(): Promise<User | null> {
  const userCookie = cookies().get("user")?.value;

  if (!userCookie?.length) return null;

  const response = await fetch(
    `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.ME}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: userCookie,
      },
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["user"],
      },
    }
  );

  const data = await response.json();

  if (data?.data?.status !== "active") {
    cookies().set("user", "");
    cookies().set("role", "");
    return null;
  }

  return data.data as User;
}

export { login, logout, getLoggedInUser, register };
