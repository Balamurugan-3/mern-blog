import { configureStore } from "@reduxjs/toolkit";
import { authAPI } from "./features/auth/authAPI";
import { userAPI } from "./features/user/userAPI";
import userReducer from "./features/user/userSlice";
import { CategoryAPI } from "./features/category/CategoryAPI";
import { blogAPI } from "./features/blog/blogAPI";
import { commentAPI } from "./features/comments/commentAPI";
import { blogLikeAPI } from "./features/blogLike/blogLikeAPI";

export const store = configureStore({
    reducer: {
        [authAPI.reducerPath]: authAPI.reducer,
        [userAPI.reducerPath]: userAPI.reducer,
        user: userReducer,
        [CategoryAPI.reducerPath]: CategoryAPI.reducer,
        [blogAPI.reducerPath]: blogAPI.reducer,
        [commentAPI.reducerPath]: commentAPI.reducer,
        [blogLikeAPI.reducerPath]: blogLikeAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authAPI.middleware, userAPI.middleware, CategoryAPI.middleware, blogAPI.middleware,
            commentAPI.middleware, blogLikeAPI.middleware
        )
})

