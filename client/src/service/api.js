import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://blogger-server-site.vercel.app/", credentials: "include" }),
  tagTypes: ['User', "Blog"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
    }),
    getUser: builder.query({
      query: () => "auth/profile",
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "auth/refresh-token",
        method: "POST",
      }),
    }),
    getBlogList: builder.query({
      query: () => "blog/list",
    }),
    getBlogListByUser: builder.query({
      query: () => "blog/list-by-user",
      providesTags: ["Blog"]
    }),
    createBlog: builder.mutation({
      query: (data) => ({
        url: "blog/upload",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Blog"]
    }),
    blogDetails: builder.query({
      query: (slug) => `blog/read/${slug}`,
    }),
  }),
});

export const { useGetBlogListQuery, useLoginMutation, useGetUserQuery, useRefreshTokenMutation, useGetBlogListByUserQuery, useCreateBlogMutation, useBlogDetailsQuery } = api;
