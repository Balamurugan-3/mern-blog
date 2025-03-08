import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentAPI = createApi({
    reducerPath: "commentAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://mern-blog-ury1.vercel.app/api/comment",
        credentials: "include"
    }),
    tagTypes: ["Comment"],

    endpoints: (builder) => ({

        getComments: builder.query({
            query: (blogId) => `/${blogId}`,
            providesTags: (result, error, arg) =>
                result ? [{ type: "Comment", id: arg }] : [{ type: "Comment" }],
        }),
        getAllComments: builder.query({
            query: () => '/get-all-comments',
            providesTags: (result, error, arg) =>
                result ? [{ type: "Comment", id: arg }] : [{ type: "Comment" }]
        }),
        addComment: builder.mutation({
            query: (data) => ({
                url: `/add-comment`,
                method: "POST",
                body: data
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Comment", id }]
        }),
        deleteComment: builder.mutation({
            query: (id) => ({
                url: `/delete-comment/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Comment", id }]
        }),
        getCommentsCount: builder.query({
            query: (blogId) => `/count-comment/${blogId}`,
            providesTags: (result, error, arg) =>
                result ? [{ type: "Comment", id: arg }] : [{ type: "Comment" }],
        }),
    })
})

export const { useGetCommentsQuery, useGetAllCommentsQuery, useAddCommentMutation, useGetCommentsCountQuery
    , useDeleteCommentMutation
 } = commentAPI