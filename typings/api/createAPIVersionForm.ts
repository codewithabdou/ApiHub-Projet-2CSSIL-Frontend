import { z } from "zod";

export const createApiVersionFormSchema = z.object({
  version: z.string().min(2, {
    message: "Please enter a valid version .",
  }),
  base_url: z.string().min(8, {
    message: "Please enter a valid base_url.",
  }),
  headers: z.array(
    z.object({
      key: z.string({ required_error: "This field can't be empty" }),
      value: z.string({ required_error: "This field can't be empty" }),
    })
  ),
  endpoints: z.array(
    z.object({
      url: z.string({ required_error: "This field can't be empty" }),
      method: z.string({ required_error: "This field can't be empty" }),
      description: z.string({ required_error: "This field can't be empty" }),
      request_body: z.string({ required_error: "This field can't be empty" }),
      response_body: z.string({ required_error: "This field can't be empty" }),
    })
  ),
});

export type createAPIVersionRequest = z.infer<
  typeof createApiVersionFormSchema
>;

export type successCreateAPIVersionResponse = {
  status: String;
  message: String;
};

export type errorCreateAPIVersionResponse = {
  errors?: any;
  message: String;
  status: String;
};
