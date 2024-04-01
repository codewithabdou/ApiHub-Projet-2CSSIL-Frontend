import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email().min(2, {
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(2, {
    message: "Please enter a valid password.",
  }),
});

const registerFormSchema = z
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

export type registerRequest = z.infer<typeof registerFormSchema>;

export type loginRequest = z.infer<typeof loginFormSchema>;

export type successLoginResponse = {
  userId:number;
  status: String;
  message: String;
};

export type successRegisterResponse = {
  status: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
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

export { loginFormSchema, registerFormSchema };
