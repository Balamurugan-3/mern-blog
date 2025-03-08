import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const CategoryAPI = createApi({
    reducerPath: "CategoryAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/category",
        credentials: "include"
    }),
    tagTypes: ["Category"],
    endpoints: (builder) => ({
        getAllCategory: builder.query({
            query: () => "/",
            providesTags: (result, error, arg) => result ? [{ type: "Category", id: arg }] : [{ type: "Category" }]
        }),
        getSingleCategory: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, arg) => result ? [{ type: "Category", id: arg }] : [{ type: "Category" }]
        }),
        addCategory: builder.mutation({
            query: (data) => ({
                url: "/add-category",
                method: "POST",
                body: data
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Category", id }]
        }),
        updateCategory: builder.mutation({
            query: ({ categoryId, data }) => ({
                url: `/update-category/${categoryId}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Category", id }]
        }),
        deleteCategory: builder.mutation({
            query: (categoryId) => ({
                url: `/delete-category/${categoryId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Category", id }]
        }),

    })
})

export const { useGetAllCategoryQuery, useGetSingleCategoryQuery, useAddCategoryMutation,
    useUpdateCategoryMutation, useDeleteCategoryMutation
} = CategoryAPI

