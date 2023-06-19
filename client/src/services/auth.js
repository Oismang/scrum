import Cookies from "js-cookie";
import { api } from "./api";

export const USER_TOKEN_COOKIE = "user_token";
export const USER_ROLES = {
  USER: "user",
  ADMIN: "admin"
}

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response, meta, arg) => {
        Cookies.set(USER_TOKEN_COOKIE, response?.token);
        return response;
      },
    }),

    login: build.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response, meta, arg) => {
        Cookies.set(USER_TOKEN_COOKIE, response?.token);
        return response;
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = userApi;
