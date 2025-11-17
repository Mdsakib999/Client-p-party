import { baseApi } from "../../baseApi";

export const candidateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCandidate: builder.mutation({
      query: (candidateData) => ({
        url: "/candidates/create-candidate",
        method: "POST",
        data: candidateData,
      }),
      invalidatesTags: ["CANDIDATE"],
    }),
    getAllCandidates: builder.query({
      query: () => ({
        url: "/candidates",
        method: "GET",
      }),
      providesTags: ["CANDIDATE"],
    }),
    getCandidateById: builder.query({
      query: (id) => ({
        url: `/candidates/${id}`,
        method: "GET",
      }),
      providesTags: ["CANDIDATE"],
    }),
    updateCandidate: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/candidates/${id}`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: ["CANDIDATE"],
    }),
    deleteCandidate: builder.mutation({
      query: (id) => ({
        url: `/candidates/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CANDIDATE"],
    }),
  }),
});

export const {
  useCreateCandidateMutation,
  useGetAllCandidatesQuery,
  useGetCandidateByIdQuery,
  useUpdateCandidateMutation,
  useDeleteCandidateMutation,
} = candidateApi;
