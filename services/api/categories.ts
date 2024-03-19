"use server";
import { API_INFO } from "@config";
import {
  categoryRequest,
  successCreateCategoryResponse,
  errorCreateCategoryResponse,
  sucessGetCategoriesResponse,
  errorGetCategoriesResponse
} from "@typings/api/createCategoryType"; // Assuming you have typings for categories
import { cookies } from "next/headers";


export const getCategories = async (
): Promise<  errorGetCategoriesResponse| sucessGetCategoriesResponse> => {
  try {
    const userCookie = cookies().get("user")?.value;

    if (!userCookie?.length)
    return {
      status: "error",
      message: "User not found or not active",
    };

    const res = await fetch(
      `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.CATEGORIES.GET_CATEGORIES}`,
      {
        method: "GET",
        headers: {
          Authorization: userCookie,
          "Content-Type": "application/json",
        },
      }
    );
    const data: successCreateCategoryResponse = await res.json();
    return data;
  } catch (error) {
    return {
      status: "error",
      message: "An error occurred while fetching categories ! ",
    };
  }
};

export const createCategory = async (
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
        const data: successCreateCategoryResponse = await res.json();
        return data;
    } catch (error) {
        return {
        status: "error",
        message: "An error occurred while creating category",
        };
    }
    }






