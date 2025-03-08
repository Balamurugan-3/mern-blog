import React from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { useDeleteBlogMutation, useGetAllBlogsQuery } from '../../store/features/blog/blogAPI';
import moment from 'moment';
import toast from 'react-hot-toast';
import Loading from '../../components/Loading';


const BlogDetails = () => {

    const { data: blogs, isLoading } = useGetAllBlogsQuery()

    //delete 
    const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation()
    const handleDeleteBlog = async (blogId) => {
        if (confirm("Are you sure to delete ?")) {
            try {
                const res = await deleteBlog(blogId).unwrap()
                if (res) {
                    toast.success("Blog deleted successfully")
                }
            } catch (error) {
                toast.success("failed to delete blog")
            }
        }
    }

    if (isLoading || isDeleting) {
        // return <Loading />
        return <h1>Loading</h1>
    }
    return (
        <div className='p-2'>

            <div className='my-5 '>
                <Link to="/blog-add" className='md:px-6 px-4 py-2 bg-indigo-700 text-white font-medium rounded-md '>Add Blog</Link>
            </div>
            {/* <div className='lg:w-[90%] w-[98%]  lg:p-5 p-2 overflow-auto'>
                <div className='mb-5 '>
                    <Link to="add" className='md:px-6 px-4 py-2 bg-indigo-700 text-white font-medium rounded-md '>Add Category</Link>
                </div>

                {/* {category?.length > 0 ? 
            <table className="w-full border border-gray-300 rounded-lg text-xs">
                <thead className="bg-gray-100 text-left">
                    <tr>
                        <th className="p-2  border-b w-auto">Author</th>
                        <th className="p-2  border-b w-auto">Category Name</th>
                        <th className="p-2  border-b w-auto">Title</th>
                        <th className="p-2  border-b w-auto">Slug</th>
                        <th className="p-2  border-b w-auto ">Published</th>
                        <th className="p-2  border-b w-auto ">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b">
                        <td className="p-2  w-auto">Bala</td>
                        <td className="p-2  w-auto">Technology</td>
                        <td className="p-2  w-auto">Technology-growing-in-AI-2090-March</td>
                        <td className="p-2  w-auto">Technology-growing-in-AI-2090-March</td>
                        <td className="p-2  w-auto">12/31/</td>
                        <td className="p-2  w-auto flex flex-wrap md:gap-2 gap-1">
                            <Link className="rounded">
                                <FaRegEdit className='text-xl md:text-2xl' color="green" />
                            </Link>
                            <Link className="rounded">
                                <FaRegEdit className='text-xl md:text-2xl' color="green" />
                            </Link>
                            <button className="rounded">
                                <MdOutlineDeleteOutline className='text-xl md:text-2xl' color="red" />
                            </button>
                        </td>
                    </tr>
                    {/* {category?.map((c) => (
                <tr className="border-b" key={c._id}>
                    <td className="p-2  w-1/3">{c?.name}</td>
                    <td className="p-2  w-1/3">{c?.slug}</td>
                    <td className="p-2  w-1/3 flex gap-5 md:mx-auto">
                        <Link to={`update/${c._id}`} className="rounded">
                            <FaRegEdit className='text-xl md:text-2xl' color="green" />
                        </Link>
                        <button className="rounded" onClick={() => handleDelete(c._id)}>
                            <MdOutlineDeleteOutline className='text-xl md:text-2xl' color="red" />
                        </button>
                    </td>
                </tr>
            ))} 

                </tbody>
            </table>
            :
            <div className='text-red-600 p-2'>No Categories Found</div>
            

        </div> */}

            {/* <div class="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border"> */}
            <div className="overflow-auto lg:overflow-visible">
                <table className="w-full text-left table-auto">
                    <thead>
                        <tr>
                            <th className="p-2 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p className="block font-sans text-sm antialiased leading-none text-blue-gray-900 opacity-70">
                                    Author
                                </p>
                            </th>
                            <th className="p-2 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p className="block font-sans text-sm antialiased leading-none text-blue-gray-900 opacity-70">
                                    Category Name
                                </p>
                            </th>
                            <th className="p-2 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p className="block font-sans text-sm antialiased leading-none text-blue-gray-900 opacity-70">
                                    Title
                                </p>
                            </th>
                            <th className="p-2 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p className="block font-sans text-sm antialiased leading-none text-blue-gray-900 opacity-70">
                                    Slug
                                </p>
                            </th>
                            <th className="p-2 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p className="block font-sans text-sm antialiased leading-none text-blue-gray-900 opacity-70">
                                    Published
                                </p>
                            </th>
                            <th className="p-2 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p className="block font-sans text-sm antialiased leading-none text-blue-gray-900 opacity-70">
                                    Actions
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs?.length === 0 && <div className='p-2'>No Blogs</div>}
                        {blogs?.map((blog) => (
                            <tr key={blog?._id}>
                                <td className="p-2 border-b border-blue-gray-50 whitespace-normal">
                                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                        {blog?.author?.name || "Guest"}
                                    </p>
                                </td>
                                <td className="p-2 border-b border-blue-gray-50 whitespace-normal">
                                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                        {blog?.category?.name}
                                    </p>
                                </td>
                                <td className="p-2 border-b border-blue-gray-50 whitespace-normal">
                                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                        {blog?.title}
                                    </p>
                                </td>
                                <td className="p-2 border-b border-blue-gray-50 whitespace-normal">
                                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                        {blog?.slug}
                                    </p>
                                </td>
                                <td className="p-2 border-b border-blue-gray-50 whitespace-normal">
                                    <p className="block font-sans text-xs antialiased font-normal leading-normal text-blue-gray-900">
                                        {moment(blog?.createdAt).fromNow()}
                                    </p>
                                </td>
                                <td className="p-2 border-b border-blue-gray-50 whitespace-normal text-end">
                                    <p className="font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 flex gap-2 flex-wrap word-break">
                                        <Link to={`/blog/${blog?.category.slug}/${blog?._id}`} className="rounded">
                                            <FaEye className='text-lg md:text-xl' color="green" />
                                        </Link>
                                        <Link to={`/blog-update/${blog._id}`} className="rounded">
                                            <FaRegEdit className='text-lg md:text-xl' color="green" />
                                        </Link>
                                        <button className="rounded" onClick={() => handleDeleteBlog(blog?._id)}>
                                            <MdOutlineDeleteOutline className='text-lg md:text-xl' color="red" />
                                        </button>
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        // </div>

    )
}

export default BlogDetails