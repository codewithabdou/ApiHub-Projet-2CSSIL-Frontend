"use server";
import { API_INFO } from "@config";
import {
  categoryRequest,
  successCreateCategoryResponse,
  errorCreateCategoryResponse,
} from "@typings/api/createCategoryType"; // Assuming you have typings for categories
import { cookies } from "next/headers";



 const createCategory = async (
  category: categoryRequest
): Promise<errorCreateCategoryResponse | successCreateCategoryResponse> => {
  try {
    const userCookie = cookies().get("user")?.value;

    if (!userCookie?.length)
      return {
        status: "error",
        message: "User not found or not active",
      };

    const res = await fetch(
      `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.CATEGORIES.CREATE_CATEGORY}`,

      {
        method: "POST",
        headers: {
          Authorization: userCookie,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      }
    );
    if (res.ok){
      return {status : "success"}
    }
    else {
      let error =await  res.json();
      return {status : "error" , ... error } as errorCreateCategoryResponse
    }
  } catch (error) {
    return {
      status: "error",
      message: "An error occurred while creating category",
    };
  }
};

export default createCategory;