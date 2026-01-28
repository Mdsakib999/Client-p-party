import { baseApi } from "../../baseApi";

export const candidateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CREATE
    createCandidate: builder.mutation({
      query: (candidateData) => ({
        url: "/candidates/create-candidate",
        method: "POST",
        data: candidateData,
      }),
      invalidatesTags: ["CANDIDATE_LIST"],
    }),

    // ✅ GET ALL
    getAllCandidates: builder.query({
      query: () => ({
        url: "/candidates",
        method: "GET",
      }),
      providesTags: ["CANDIDATE_LIST"],
    }),

    // ✅ GET BY ID
    getCandidateById: builder.query({
      query: (id) => ({
        url: `/candidates/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "CANDIDATE", id }],
    }),

    // ✅ UPDATE
    updateCandidate: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/candidates/${id}`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "CANDIDATE", id },
        "CANDIDATE_LIST",
      ],
    }),

    // ✅ DELETE
    deleteCandidate: builder.mutation({
      query: (id) => ({
        url: `/candidates/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "CANDIDATE", id },
        "CANDIDATE_LIST",
      ],
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
