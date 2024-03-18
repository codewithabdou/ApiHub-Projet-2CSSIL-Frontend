// retouner le type , creer le shema handling errors meme we r done api calling 
// we need to handle if we succees or no so on cree les type 

import { z } from "zod";



export const SupplierSchema=z.object({
email : z.string(),
password: z.string(),
firsname :z.string(),
lastname:z.string(),

})

export const createSupplierFormSchema = z
  .object({
    firstname: z.string().min(2, {
      message: "Please enter a valid first name.",
    }),
    lastname: z.string().min(2, {
      message: "Please enter a valid last name.",
    }),
    email: z.string().email().min(2, {
      message: "Please enter a valid email address.",
    }),
    password: z
      .string()
      .refine(
        (val) =>
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
            val
          ),
        {
          message:
            "Password must be at least 8 characters long and contain at least one uppercase character, one lowercase character, and one special symbol",
        }
      ),
    confirmPassword: z.string(),
  })

  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });
  export type createSupplierRequest = z.infer<typeof createSupplierFormSchema >;

  export type successcreateSupplierrResponse = {
    status: String;
    message: String;
  };


  export type errorcreateSupplierrResponse = {
    status: String;
    message: String;
  };