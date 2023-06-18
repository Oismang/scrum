import { api, apiTags } from "./api";

export const sprintApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllProjectSprints: build.query({
      query: (projectId) => ({ url: `project/${projectId}/sprint` }),
      transformResponse: (response, meta, arg) => response.sprints,
      providesTags: (sprints = []) => [
        ...sprints.map(({ _id }) => ({ type: apiTags.SPRINT, _id })),
        { type: apiTags.SPRINT, id: "LIST" },
      ],
    }),

    createProjectSprint: build.mutation({
      query(data) {
        const { projectId, sprint } = data;
        return {
          url: `/project/${projectId}/sprint`,
          method: "POST",
          body: sprint,
        };
      },
      invalidatesTags: [{ type: apiTags.SPRINT, id: "LIST" }],
    }),

    updateSprint: build.mutation({
      query(data) {
        const { sprintId, sprint } = data;
        return {
          url: `/sprint/${sprintId}`,
          method: "PATCH",
          body: sprint,
        };
      },
      invalidatesTags: (sprints, error, arg) => [
        { type: apiTags.SPRINT, id: arg?.data?.sprintId },
      ],
    }),

    deleteSprint: build.mutation({
      query: (sprintId) => ({
        url: `/sprint/${sprintId}`,
        method: "DELETE",
      }),
      invalidatesTags: (projects, error, arg) => [
        { type: apiTags.SPRINT, id: arg?.data?.sprintId },
      ],
    }),
  }),
});

export const {
  useGetAllProjectSprintsQuery,
  useCreateProjectSprintMutation,
  useUpdateSprintMutation,
  useDeleteSprintMutation,
} = sprintApi;
