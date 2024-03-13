import { z } from "zod";

const createCategorySchema = z.object({
  name: z.string().min(2, {
    message: "Please enter a valid name address.",
  }),
  description: z.string().min(8, {
    message: "Please enter a valid description.",
  }),
});



export type categoryRequest = z.infer<typeof createCategorySchema>;


export type successCreateCategoryResponse = {
  status: String;
  message: String;
  // fill data form api  respoinse 
};


export type errorAuthResponse = {
  errors?: any;
  message: String;
  status?: String;
};

export type succesGetLoggedInUserResponse = {
  data: {
    id: number;
    email: string;
    role: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
  status: string;
};

export { createCategorySchema};
