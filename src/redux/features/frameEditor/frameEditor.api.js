import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const frameEditorApi = createApi({
  reducerPath: "frameEditorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    uploadFramedImage: builder.mutation({
      query: (data) => ({
        url: "/frame-editor/upload",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUploadFramedImageMutation } = frameEditorApi;
