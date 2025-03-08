import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blogAPI = createApi({
    reducerPath: "blogAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://mern-blog-ury1.vercel.app/api/blog",
        credentials: "include",
        prepareHeaders: (headers) => {
            headers.set("Cache-Control", "no-store");
            return headers;
          }
    }),
    tagTypes: ["Blog"],
    endpoints: (builder) => ({
        getAllBlogs: builder.query({
            query: () => "/blogs",
            providesTags: (result, error, arg) => result ? [{ type: "Blog", id: arg }] : [{ type: "Blog" }]
        }),
        getSingleBlog: builder.query({
            query: (blogId) => `/blog/${blogId}`,
            providesTags: (result, error, arg) => result ? [{ type: "Blog", id: arg }] : [{ type: "Blog" }]
        }),
        getRelatedBlogs: builder.query({
            query: ({ category, blog }) => `/related-blog/${category}/${blog}`,
            // invalidatesTags:(result,error,{id})=>[{type:"Blog"}]
            providesTags: (result, error, arg) => result ? [{ type: "Blog", id: arg }] : [{ type: "Blog" }]
        }),
        getBlogsWithCategory: builder.query({
            query: (category) => `/blog-category/${category}`,
            providesTags: (result, error, arg) => result ? [{ type: "Blog", id: arg }] : [{ type: "Blog" }]
        }),
        searchBlog: builder.query({
            query: (q) => `/search?q=${q}`,
            providesTags: (result, error, arg) => result ? [{ type: "Blog", id: arg }] : [{ type: "Blog" }]
        }),
        addBlog: builder.mutation({
            query: (formData) => ({
                url: "/create-blog",
                method: "POST",
                body: formData
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Blog", id }]
        }),
        updateBlog: builder.mutation({
            query: ({ blogId, formData }) => ({
                url: `/update-blog/${blogId}`,
                method: "PUT",
                body: formData
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Blog", id }]
        }),
        deleteBlog: builder.mutation({
            query: (blogId) => ({
                url: `/delete-blog/${blogId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Blog", id }]
        }),

    })
})

export const { useGetAllBlogsQuery, useGetSingleBlogQuery, useGetRelatedBlogsQuery, useGetBlogsWithCategoryQuery,
    useSearchBlogQuery,
    useAddBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation
} = blogAPI

