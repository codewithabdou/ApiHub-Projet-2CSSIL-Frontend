"use server"
import { API_INFO } from "@config";
import { ErrorgetAllCategoriesResponse, getAllCategoriesSuccessResponse } from "@typings/api/getCategoryTypes";
async function getAllCategories():Promise<getAllCategoriesSuccessResponse | ErrorgetAllCategoriesResponse>
{
    try{
       
        const response = await fetch(
            `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.GETCATEGORIES}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data:getAllCategoriesSuccessResponse = await response.json();
          return data ;
    }catch (error:any){
        return {
            status: "server error",
            message: error.message || "An unexpected server error occurred",
          } as ErrorgetAllCategoriesResponse;
    }
}
export default getAllCategories;