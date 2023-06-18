import { api, apiTags } from "./api";

export const TASK_STATUSES = {
  TODO: "TODO",
  DOING: "DOING",
  DONE: "DONE"
}

export const taskApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllProjectTasks: build.query({
      query: (projectId) => ({ url: `project/${projectId}/task` }),
      transformResponse: (response, meta, arg) => response.tasks,
      providesTags: (tasks = []) => [
        ...tasks.map(({ _id }) => ({ type: apiTags.TASK, _id })),
        { type: apiTags.TASK, id: "LIST" },
      ],
    }),

    createProjectTask: build.mutation({
      query(data) {
        const { projectId, task } = data;
        return {
          url: `/project/${projectId}/task`,
          method: "POST",
          body: task,
        };
      },
      invalidatesTags: [{ type: apiTags.TASK, id: "LIST" }],
    }),

    updateTask: build.mutation({
      query(data) {
        const { taskId, task } = data;
        return {
          url: `/task/${taskId}`,
          method: "PATCH",
          body: task,
        };
      },
      invalidatesTags: (tasks, error, arg) => [
        { type: apiTags.TASK, id: arg?.data?.taskId },
      ],
    }),

    deleteTask: build.mutation({
      query: (taskId) => ({
        url: `/task/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: (projects, error, arg) => [
        { type: apiTags.TASK, id: arg?.data?.taskId },
      ],
    }),
  }),
});

export const {
  useGetAllProjectTasksQuery,
  useCreateProjectTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
