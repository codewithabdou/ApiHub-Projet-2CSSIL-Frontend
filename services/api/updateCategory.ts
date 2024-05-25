"use server";
import {
  UpdateProfileAdminSchema,
  errorUpdateAdminProfileResponse,
  successUpdateAdminProfileResponse,
} from "./../../typings/api/AdminProfile";
import { UpdateAdminProfileRequest } from "@typings/api/AdminProfile";
import { cookies } from "next/headers";
import { API_INFO } from "@config";

const updateCategory = async (
  formData: {name:string , description:string} , categoryId: string
): Promise< {status :string} > => {
  const formDataJson = JSON.stringify(formData);
  const userCookie = cookies().get("user")?.value;

  try {
    const response = await fetch(
      `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.GETCATEGORIES}/${categoryId}/update`,
      {
        method: "PATCH",
        body: formDataJson,
        headers: {
          "Content-Type": "application/json",
          Authorization: userCookie || "",
        },
      }
    );
    console.log('response', response)
    // console.log('data', data)

    if (response.status == 200) {
      return {
        status: "success",
      } 
    } else {
      return {
        status: "error",
      } 
    }
  } catch (error: any) {
    console.log("error in catch");
    console.log(error);
    return {
      status: "server error",
    } 
  }
};
export { updateCategory };
