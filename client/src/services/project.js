import { api, apiTags } from "./api";

export const projectApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllProjects: build.query({
      query: () => ({ url: "project" }),
      transformResponse: (response, meta, arg) => response.projects,
      providesTags: (projects = []) => [
        ...projects.map(({ _id }) => ({ type: apiTags.PROJECT, _id })),
        { type: apiTags.PROJECT, id: "LIST" },
      ],
    }),

    creteProject: build.mutation({
      query: (data) => ({
        url: "/project",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: apiTags.PROJECT, id: "LIST" }],
    }),
  }),
});

export const { useGetAllProjectsQuery, useCreteProjectMutation } = projectApi;
