import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { USER_TOKEN_COOKIE } from "./auth";

export const apiTags = {
  PROJECT: "Project",
  TASK: "Task",
  SPRINT: "Sprint"
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/api/v1",
  prepareHeaders: (headers) => {
    const token = Cookies.get(USER_TOKEN_COOKIE);

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQuery,
  tagTypes: Object.values(apiTags),
  endpoints: () => ({}),
});
