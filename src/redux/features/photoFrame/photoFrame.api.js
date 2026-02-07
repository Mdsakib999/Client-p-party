import { baseApi } from "../../baseApi";

const photoFrameApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPhotoFrames: builder.query({
      query: (params) => ({
        url: "/photo-frames",
        method: "GET",
        params: params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: "PHOTO_FRAME",
                id: _id,
              })),
              { type: "PHOTO_FRAME", id: "LIST" },
            ]
          : [{ type: "PHOTO_FRAME", id: "LIST" }],
    }),
    addPhotoFrame: builder.mutation({
      query: (formData) => ({
        url: "/photo-frames/create-frame",
        method: "POST",
        data: formData,
      }),
      invalidatesTags: [{ type: "PHOTO_FRAME", id: "LIST" }],
    }),
    deletePhotoFrame: builder.mutation({
      query: (id) => ({
        url: `/photo-frames/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "PHOTO_FRAME", id },
        { type: "PHOTO_FRAME", id: "LIST" },
      ],
    }),
    updatePhotoFrame: builder.mutation({
      query: ({ id, data }) => ({
        url: `/photo-frames/${id}`,
        method: "PUT",
        data: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "PHOTO_FRAME", id },
        { type: "PHOTO_FRAME", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetPhotoFramesQuery,
  useAddPhotoFrameMutation,
  useDeletePhotoFrameMutation,
  useUpdatePhotoFrameMutation,
} = photoFrameApi;
