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

    getAllCandidates: builder.query({
      query: ({ page = 1, limit = 9, division, district, search }) => {
        const params = new URLSearchParams();

        params.append("page", page);
        params.append("limit", limit);
        if (division) params.append("division", division);
        if (district) params.append("district", district);
        if (search) params.append("search", search);

        return {
          url: `/candidates?${params.toString()}`,
          method: "GET",
        };
      },
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
