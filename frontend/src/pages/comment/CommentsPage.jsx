import React from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { useDeleteBlogMutation, useGetAllBlogsQuery } from '../../store/features/blog/blogAPI';
import moment from 'moment';
import toast from 'react-hot-toast';
import { useDeleteCommentMutation, useGetAllCommentsQuery } from '../../store/features/comments/commentAPI';
import Loading from '../../components/Loading';


const BlogDetails = () => {

    const { data: comments, isLoading } = useGetAllCommentsQuery()
    // console.log("get all blogs,",blogs)

    //delte 
    const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation()

    const handleDeleteBlog = async (commentId) => {
        if (confirm("Are you sure to delete ?")) {
            try {
                const res = await deleteComment(commentId).unwrap()
                if (res) {
                    toast.success("Comment deleted successfully")
                }
            } catch (error) {
                toast.success("failed to delete blog")
            }
        }
    }
      if(isLoading){
        return <Loading/>
      }
    
    return (
        <div className='p-3'>

            <div className='my-5 '>
                {/* <Link to="/blog-add" className='md:px-6 px-4 py-2 bg-indigo-700 text-white font-medium rounded-md '>Add Blog</Link> */}
                <h1 className='text=xl font-medium'>Comments</h1>
            </div>

            {/* <div class="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border"> */}
            <div className="overflow-auto lg:overflow-visible">
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            <th className="p-3 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p className="block font-sans text-sm antialiased leading-none text-blue-gray-900 opacity-70">
                                    Blog
                                </p>
                            </th>
                            <th className="p-3 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p className="block font-sans text-sm antialiased leading-none text-blue-gray-900 opacity-70">
                                    Commented By
                                </p>
                            </th>
                            <th className="p-3 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p className="block font-sans text-sm antialiased leading-none text-blue-gray-900 opacity-70">
                                    Comment
                                </p>
                            </th>
                            <th className="p-3 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p className="block font-sans text-sm antialiased leading-none text-blue-gray-900 opacity-70">
                                    Date
                                </p>
                            </th>
                            <th className="p-3 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p className="block font-sans text-sm antialiased leading-none text-blue-gray-900 opacity-70">
                                    Actions
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments?.length === 0 && <div className='p-3'>No Blogs</div>}
                        {comments?.map((comment) => (
                            <tr key={comment?._id}>
                                <td className="p-3 border-b border-blue-gray-50 whitespace-normal">
                                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                        {comment?.blogId?.title}
                                    </p>
                                </td>
                                <td className="p-3 border-b border-blue-gray-50 whitespace-normal">
                                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                        {comment?.author?.name}
                                    </p>
                                </td>
                                <td className="p-3 border-b border-blue-gray-50 whitespace-normal">
                                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                        {comment?.comment}
                                    </p>
                                </td>
                                <td className="p-3 border-b border-blue-gray-50 whitespace-normal">
                                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                        {moment(comment?.createdAt).format("DD-MM-YYYY HH:mm A")}
                                    </p>
                                </td>
                                <td className="p-3 border-b border-blue-gray-50 whitespace-normal ">
                                    <p className="font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 flex gap-3 flex-wrap word-break">
                                    <button className="rounded mx-auto" onClick={() => handleDeleteBlog(comment?._id)}>
                                        <MdOutlineDeleteOutline className='text-xl md:text-2xl' color="red" />
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
