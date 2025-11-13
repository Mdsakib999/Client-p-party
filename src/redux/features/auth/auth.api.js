import { baseApi } from "../../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags: ["USER"],
    }),
    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    setPassword: builder.mutation({
      query: (password) => ({
        url: "/auth/set-password",
        method: "POST",
        data: { password },
      }),
      invalidatesTags: ["USER"],
    }),
    changePassword: builder.mutation({
      query: (passwords) => ({
        url: "/auth/change-password",
        method: "POST",
        data: passwords,
      }),
      invalidatesTags: ["USER"],
    }),
    forgotPassword: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/forgot-password",
        method: "POST",
        data: userInfo,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),
    sendOtp: builder.mutation({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: userInfo,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (userInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: userInfo,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useUserInfoQuery,
  useSetPasswordMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useLogoutMutation,
} = authApi;
