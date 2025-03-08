import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogLikeAPI = createApi({
    reducerPath: "blogLikeAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://mern-blog-ury1.vercel.app/api/blogLike",
        credentials: "include",
        prepareHeaders: (headers) => {
            headers.set("Cache-Control", "no-store");  // Prevent caching
            headers.set("Pragma", "no-cache");
            headers.set("Expires", "0");
            return headers;
        }
    }),
    tagTypes: ["BlogLike"],

    endpoints: (builder) => ({
        toggleLike: builder.mutation({
            query: (data) => ({
                url: `/like`,
                method: "POST",
                body: data
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "BlogLike", id }]
        }),
        getLikeCounts: builder.query({
            query: ({blogId,user}) => `/like-count/${blogId}/${user}`,
            providesTags: (result, error, arg) =>
                result ? [{ type: "BlogLike", id: arg }] : [{ type: "BlogLike" }],
        }),
    })
})

export const { useToggleLikeMutation,useGetLikeCountsQuery } = blogLikeAPI