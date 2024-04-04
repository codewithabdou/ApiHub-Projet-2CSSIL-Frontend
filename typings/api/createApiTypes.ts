import { z } from "zod";
const numbersRegex = /^(?:[0-9]+)?$/;
const createApiFormSchema = z.object({
  name: z.string().min(2, {
    message: "Please enter a valid name .",
  }),
  description: z.string().min(8, {
    message: "Please enter a valid description.",
  }),
  category_id: z
    .string({ required_error: "This field can't be empty" })
    .min(1, { message: "This field can't be empty" })
    .regex(numbersRegex, { message: "Vous devez entrer un nombre valide" }),
  plans: z.array(
    z.object({
      name: z.string({ required_error: "This field can't be empty" }),
      description: z.string({ required_error: "This field can't be empty" }),
      price: z
        .string({ required_error: "This field can't be empty" })
        .regex(numbersRegex, { message: "Vous devez entrer un nombre valide" }),
      max_requests: z
        .string({ required_error: "This field can't be empty" })
        .regex(numbersRegex, { message: "Vous devez entrer un nombre valide" }),
      duration: z
        .string({ required_error: "This field can't be empty" }),
        
    })
  ),
});



export type createApiRequest = z.infer<typeof createApiFormSchema>;

export type successCreateApiResponse = {
  message: String;
  status?: number;
};

export type errorCreateApiResponse = {
  errors?: any;
  message: String;
  status?: String;
};



export { createApiFormSchema };
