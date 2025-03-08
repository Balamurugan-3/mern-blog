import React from 'react'
import { Link, NavLink } from "react-router-dom"
import { IoHomeOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { GrBlog } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { GoDot } from "react-icons/go";
import { useGetAllCategoryQuery } from '../store/features/category/CategoryAPI';
import { useSelector } from 'react-redux';
import Loading from './Loading';

const Sidebar = () => {
    const { data: categoryList, isLoading } = useGetAllCategoryQuery()

    const { userData } = useSelector(state => state.user)
    // console.log("categoryList", categoryList)
    return (
        // hidden w-0 md:block md:w-72 md:min-h-[calc(100vh-4rem)] border-r 
        // md:fixed left-0 top-16 py-8 px-6 
        <div className="py-4">
            {/* Navigation Links */}
            <div className="space-y-4 text-md">
                <NavLink to="/" className={({ isActive }) =>
                    `flex items-center gap-2 hover:text-gray-300 border-l-4 px-2 rounded-sm ${isActive ? "border-red-500" : "border-transparent"}
                ${userData.role === "admin" && "my"}`
                }>
                    <IoHomeOutline className="text-xl" /> Home
                </NavLink>

                {userData && userData.role === "admin" &&
                    <>
                        <NavLink to="/category" className={({ isActive }) =>
                            `flex items-center gap-2 hover:text-gray-300 border-l-4 px-2 rounded-sm ${isActive ? "border-red-500" : "border-transparent"}`
                        }>
                            <BiCategory className="text-xl" /> Categories
                        </NavLink>
                        <NavLink to="/blogs" className={({ isActive }) =>
                            `flex items-center gap-2 hover:text-gray-300 border-l-4 px-2 rounded-sm ${isActive ? "border-red-500" : "border-transparent"}`
                        }>
                            <GrBlog className="text-xl" /> Blogs
                        </NavLink>
                        <NavLink to="/comments" className={({ isActive }) =>
                            `flex items-center gap-2 hover:text-gray-300 border-l-4 px-2 rounded-sm ${isActive ? "border-red-500" : "border-transparent"}`
                        }>
                            <FaRegComments className="text-xl" /> Comments
                        </NavLink>
                        <NavLink to="/users" className={({ isActive }) =>
                            `flex items-center gap-2 hover:text-gray-300 border-l-4 px-2 rounded-sm ${isActive ? "border-red-500" : "border-transparent"}`
                        }>
                            <FiUsers className="text-xl" /> Users
                        </NavLink>
                    </>
                }
            </div>

            {isLoading && <Loading/>}

            {/* Categories Section */}
            <div className="mt-5">
                <h2 className="text-sm uppercase text-gray-600">Categories</h2>

                <div className="mt-2 text-sm space-y-3 text-gray-950">
                    {categoryList?.map((category) => (
                        <Link key={category?._id} to={`/blog/${category?.slug}`} className="flex items-center gap-1">
                            <GoDot className="text-2xl" /> {category?.name}
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Sidebar
