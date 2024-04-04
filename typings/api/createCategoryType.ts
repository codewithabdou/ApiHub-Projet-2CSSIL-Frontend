import { z } from "zod";
import { Category } from "../entities/User";

export const createCategorySchema = z.object({
  name: z.string().min(10, {
    message: "Please enter a valid category name.",
  }),
  description: z.string().min(50, {
    message:
      "Please enter a valid category description (50 caracters minimum).",
  }),
});

export type categoryRequest = z.infer<typeof createCategorySchema>;

export type successCreateCategoryResponse = {
  status: String;
};

export type errorCreateCategoryResponse = {
  // errors?: any;
  message: String;
  status?: String;
};

export type sucessGetCategoriesResponse = {
  status: String;
  data: Category[];
};

export type errorGetCategoriesResponse = {
  status: String;
  message: String;
};
