import { Pagination } from "@typings/api/pagination";
import { API } from "@typings/entities/API";

export type SuccessGetAPIsResponse = {
  status: String;
  data: API[];
  pagination: Pagination;
};

export type ErrorGetAPIsResponse = {
  status: String;
  message: String;
};
