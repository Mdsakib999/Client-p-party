import { baseApi } from "../../baseApi";

export const activityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllActivities: builder.query({
      query: () => ({
        url: "/activity/all-activities",
        method: "GET",
      }),
      providesTags: ["ACTIVITY"],
    }),
    getActivityBySlug: builder.query({
      query: (slug) => ({
        url: `/activity/${slug}`,
        method: "GET",
      }),
      providesTags: ["ACTIVITY"],
    }),
    addActivity: builder.mutation({
      query: (formData) => ({
        url: "/activity/add-activity",
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["ACTIVITY"],
    }),
    updateActivity: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/activity/${id}`,
        method: "PATCH",
        data: formData,
      }),
      invalidatesTags: ["ACTIVITY"],
    }),
    deleteActivity: builder.mutation({
      query: (id) => ({
        url: `/activity/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ACTIVITY"],
    }),
  }),
});

export const {
  useGetAllActivitiesQuery,
  useGetActivityBySlugQuery,
  useAddActivityMutation,
  useUpdateActivityMutation,
  useDeleteActivityMutation,
} = activityApi;
