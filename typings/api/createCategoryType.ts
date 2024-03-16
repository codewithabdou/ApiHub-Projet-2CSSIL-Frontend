import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(10, {
    message: "Please enter a valid category name.",
  }),
  description: z.string().min(50, {
    message: "Please enter a valid category description.",
  }),
});



export type categoryRequest = z.infer<typeof createCategorySchema>;


export type successCreateCategoryResponse = {
  status: String;
  message: String;
    data: {
        name: string;
        description: string;
        created_at: string;
        updated_at: string;
    };
};


export type errorCreateCategoryResponse = {
  errors?: any;
  message: String;
  status?: String;
};


