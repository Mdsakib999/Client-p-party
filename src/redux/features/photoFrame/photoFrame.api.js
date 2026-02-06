import { baseApi } from "../../baseApi";

const photoFrameApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPhotoFrames: builder.query({
      query: (params) => ({
        url: "/photo-frames",
        method: "GET",
        params: params,
      }),
      providesTags: ["PHOTO_FRAME"],
    }),
    addPhotoFrame: builder.mutation({
      query: (formData) => ({
        url: "/photo-frames/create-frame",
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["PHOTO_FRAME"],
    }),
    deletePhotoFrame: builder.mutation({
      query: (id) => ({
        url: `/photo-frames/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PHOTO_FRAME"],
    }),
    updatePhotoFrame: builder.mutation({
      query: ({ id, data }) => ({
        url: `/photo-frames/${id}`,
        method: "PUT",
        data: data,
      }),
      invalidatesTags: ["PHOTO_FRAME"],
    }),
  }),
});

export const {
  useGetPhotoFramesQuery,
  useAddPhotoFrameMutation,
  useDeletePhotoFrameMutation,
  useUpdatePhotoFrameMutation,
} = photoFrameApi;
