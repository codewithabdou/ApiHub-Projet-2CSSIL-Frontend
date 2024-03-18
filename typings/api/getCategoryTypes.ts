import Category from "@typings/entities/Category";

export type getAllCategoriesSuccessResponse={
    data: Array<Category>;
    status: string;
}

export type ErrorgetAllCategoriesResponse = {
    status: string;
    message: string;
  };