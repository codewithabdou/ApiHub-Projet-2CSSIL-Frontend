import User from "@typings/entities/User";
import { Pagination } from "./pagination";
export type SuccessGetUsersResponse = {
  data: Array<User>;
  pagination: Pagination;
  status: string;
};

export type ErrorGetUsersResponse = {
  status: string;
  message: string;
};
