import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Home from "../pages/home/Home"
import UserLogin from "../pages/login & register/UserLogin"
import UserRegister from "../pages/login & register/UserRegister"
import Profile from "../pages/profile/Profile"
import CategoryDetails from "../pages/category/CategoryDetails"
import AddCategory from "../pages/category/AddCategory"
import UpdateCategory from "../pages/category/UpdateCategory"
import AddBlog from "../pages/blogs/AddBlog"
import Category from "../pages/category/Category"
import BlogDetails from "../pages/blogs/BlogDetails"
import UpdateBlog from "../pages/blogs/UpdateBlog"
import SingleBlog from "../pages/blogs/SingleBlog"
import BlogByCategory from "../pages/blogs/BlogByCategory"
import SearchResult from "../pages/blogs/SearchResult"
import CommentsPage from "../pages/comment/CommentsPage"
import UsersPage from "../pages/users/UsersPage"
import AuthRouteProduction from "../components/AuthRouteProduction"
import OnlyAdminRoute from "../components/OnlyAdminRoute"
import UnauthorizedPage from "../pages/Unauthorized/UnauthorizedPage"

export const router = createBrowserRouter([
    {
        path: "/", element: <App />, children: [
            { path: "/", element: <Home /> },

            {
                element: <AuthRouteProduction />, children: [
                    { path: "/profile/:id", element: <Profile /> },
                ]
            },
            {
                element: <OnlyAdminRoute />, children: [
                    { path: "/comments", element: <CommentsPage /> },
                    { path: "/users", element: <UsersPage /> },
                    {
                        path: "/category", element: <Category />,
                        children: [
                            { index: true, element: <CategoryDetails /> },
                            { path: "add", element: <AddCategory /> },
                            { path: "update/:categoryId", element: <UpdateCategory /> },
                        ]
                    },
                    { path: "/blog-add", element: <AddBlog /> },
                    { path: "/blogs", element: <BlogDetails /> },
                    { path: "/blog-update/:blogId", element: <UpdateBlog /> },

                ]
            },

            { path: "/blog/:category", element: <BlogByCategory /> },
            { path: "/blog/:category/:blogId", element: <SingleBlog /> }, // single blog

            { path: "/search", element: <SearchResult /> },


            // productRoute


        ]
    },
    { path: "/login", element: <UserLogin /> },
    { path: "/register", element: <UserRegister /> },
    { path: "/unauthorized", element: <UnauthorizedPage /> }
])

