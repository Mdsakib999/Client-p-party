import { baseApi } from "../../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ userInfo, userId }) => ({
        url: `/user/${userId}`,
        method: "PUT",
        data: userInfo,
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const { useCreateUserMutation, useUpdateUserMutation } = userApi;
