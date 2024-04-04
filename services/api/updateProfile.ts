"use server";
import {
  UpdateProfileAdminSchema,
  errorUpdateAdminProfileResponse,
  successUpdateAdminProfileResponse,
} from "./../../typings/api/AdminProfile";
import { UpdateAdminProfileRequest } from "@typings/api/AdminProfile";
import { cookies } from "next/headers";
import { API_INFO } from "@config";

const UpdateProfile = async (
  formData: UpdateAdminProfileRequest
): Promise<
  successUpdateAdminProfileResponse | errorUpdateAdminProfileResponse
> => {
  const formDataJson = JSON.stringify(formData);
  const userCookie = cookies().get("user")?.value;

  try {
    const response = await fetch(
      `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.ME}`,
      {
        method: "PATCH",
        body: formDataJson,
        headers: {
          "Content-Type": "application/json",
          Authorization: userCookie || "",
        },
      }
    );
    const data = await response.json();

    if (data == 200) {
      return {
        status: "success",
        message: "Informations mises à jour avec succès",
      } as successUpdateAdminProfileResponse;
    } else {
      return {
        status: "error",
        message: data.message || "An unexpected error occurred",
      } as errorUpdateAdminProfileResponse;
    }
  } catch (error: any) {
    console.log("error in catch");
    console.log(error);
    return {
      status: "server error",
      message: error.message || "An unexpected server error occurred",
    } as errorUpdateAdminProfileResponse;
  }
};
export { UpdateProfile };
