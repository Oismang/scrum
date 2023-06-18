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

    updateProject: build.mutation({
      query(data) {
        const { projectId, project } = data;
        return {
          url: `/project/${projectId}`,
          method: "PATCH",
          body: project,
        };
      },
      invalidatesTags: (projects, error, arg) => [
        { type: apiTags.PROJECT, id: arg?.data?.projectId },
      ],
    }),

    deleteProject: build.mutation({
      query: (projectId) => ({
        url: `/project/${projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: (projects, error, arg) => [
        { type: apiTags.PROJECT, id: arg?.data?.projectId },
      ],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useCreteProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
