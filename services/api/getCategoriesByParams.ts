"use server";
import { API_INFO } from "@config";
import buildUrl from "@helpers/buildUrl";
import {

  sucessGetCategoriesResponse,
  errorGetCategoriesResponse,
} from "@typings/api/createCategoryType"; // Assuming you have typings for categories

interface GetCategoriesOptions {
  page?: number;
  category_ids?: number;
  per_page?: number;
}



 const getCategories = async (options: GetCategoriesOptions = {}): Promise<
  errorGetCategoriesResponse | sucessGetCategoriesResponse
> => {
  try {

    const url = buildUrl(
      API_INFO.API_BASE_URL,
      API_INFO.API_ENDPOINTS.CATEGORIES.GET_CATEGORIES,
      options
    );

    const res = await fetch(
      `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.CATEGORIES.GET_CATEGORIES}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache"
      }
    );
    const data = await res.json();
    return { ...data, status: "success" } as sucessGetCategoriesResponse;
  } catch (error) {
    return {
      status: "error",
      message: "An error occurred while fetching categories ! ",
    };
  }
};

export default getCategories;