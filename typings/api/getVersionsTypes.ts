import { Version } from "@typings/entities/Versions";

export type successGetVersionsResponse = {
    data:Version[],
   
};

export type errorGetVersionsResponse = {
  errors?: any;
  message: String;
  status?: String;
};