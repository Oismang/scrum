import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: () => ({ url: "user" }),
      transformResponse: (response, meta, arg) => response.users,
    }),
  }),
});

export const { useGetAllUsersQuery } = userApi;
