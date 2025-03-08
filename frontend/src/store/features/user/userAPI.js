import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
    reducerPath: "userAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/user",
        credentials: "include"
    }),
    tagTypes: ["User"],

    endpoints: (builder) => ({
        getUser: builder.query({
            query: (id) => `/get-user/${id}`,
            providesTags: (result, error, arg) =>
                result ? [{ type: "User", id: arg }] : [{ type: "User" }],
        }),
        getAllUsers: builder.query({
            query: () => `/users`,
            providesTags: (result, error, arg) =>
                result ? [{ type: "User", id: arg }] : [{ type: "User" }],
        }),
        updateUser: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/update-user/${id}`,
                method: "PUT",
                body: formData
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "User", id }]
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/delete-user/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "User", id }]
        }),
    })
})

export const { useGetUserQuery, useUpdateUserMutation,
    useGetAllUsersQuery, useDeleteUserMutation
} = userAPI