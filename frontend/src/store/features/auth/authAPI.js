import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authAPI = createApi({
    reducerPath: "authAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://mern-blog-ury1.vercel.app/api/auth",
        credentials: "include"
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (data) => ({
                url: "/register",
                method: "POST",
                body: data
            })
        }),
        loginUser: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data
            })
        }),
        googleLogin: builder.mutation({
            query: (data) => ({
                url: "/google-login",
                method: "POST",
                body: data
            })
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url:"/logout",
                method:"POST"
            })
        }),
        isAuth: builder.query({
            query: () => "/isAuth"
        })

    })
})

export const { useRegisterUserMutation, useLoginUserMutation, useGoogleLoginMutation, useLogoutUserMutation, useIsAuthQuery } = authAPI
