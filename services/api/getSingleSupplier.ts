"use server";
import { API_INFO } from "@config";
import User from "@typings/entities/User";
import { cookies } from "next/headers";

async function GetSingleSupplier(SupplierId: number): Promise<User | null> {
  const userCookie = cookies().get("user")?.value;

  if (!userCookie?.length) return null;

  try {
    const response = await fetch(
      `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.ADMIN.GET_USER}/${SupplierId}`,

      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: userCookie,
        },
      }
    );

    const data = await response.json();
    if (data) {
      return data.data as User;
    } else {
      return null;
    }
  } catch (error: any) {
    console.log(error);
    return null;
  }
}

export default GetSingleSupplier;
