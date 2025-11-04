// src/redux/features/newsArticle/newsArticle.api.js
import { baseApi } from "../../baseApi";

export const newsArticleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNewsArticle: builder.mutation({
      query: (articleData) => ({
        url: "/news-articles/create-news-article",
        method: "POST",
        data: articleData,
      }),
      invalidatesTags: ["NEWS_ARTICLE"],
    }),
    getAllNewsArticles: builder.query({
      query: () => ({
        url: "/news-articles/all-news-articles",
        method: "GET",
      }),
      providesTags: ["NEWS_ARTICLE"],
    }),
    getNewsArticleBySlug: builder.query({
      query: (slug) => ({
        url: `/news-articles/${slug}`,
        method: "GET",
      }),
      providesTags: ["NEWS_ARTICLE"],
    }),
    updateNewsArticle: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/news-articles/${id}`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: ["NEWS_ARTICLE"],
    }),
    deleteNewsArticle: builder.mutation({
      query: (id) => ({
        url: `/news-articles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["NEWS_ARTICLE"],
    }),
  }),
});

export const {
  useCreateNewsArticleMutation,
  useGetAllNewsArticlesQuery,
  useGetNewsArticleBySlugQuery,
  useUpdateNewsArticleMutation,
  useDeleteNewsArticleMutation,
} = newsArticleApi;
