import React, { useState } from 'react'
import { FaComments } from "react-icons/fa6";
import toast from "react-hot-toast"
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAddCommentMutation } from '../store/features/comments/commentAPI';

const Comments = ({ blog }) => {

    const [comment, setComment] = useState("")

    const navigate = useNavigate()

    const { userData, isLoggedIn } = useSelector(state => state.user)
    // console.log("user1",user)

    const [addComment, { isLoading }] = useAddCommentMutation()


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isLoggedIn) {
            return toast.error("Please Login Your Account")
        }

        const data = {
            comment, author: userData?._id,
            blogId: blog?._id
        }

        try {
            const res = await addComment(data).unwrap()
            if (res) {
                toast.success("Comment Added Successfully")
                setComment("")
            }
        } catch (error) {
            toast.error("failed to add Comment")
        }
    }


    return (
        <div className="space-y-4">
            <div className='flex items-center gap-3 mb-3'>
                <FaComments className='text-indigo-600 text-2xl' />
                <h1 className='text-lg font-medium'>Comments</h1>
            </div>

            {!userData ?
                <div className='my-4 border p-3'>
                    <p className='mb-2 text-green-700'>Login to Add Comments</p>
                    <Link to="/login" className='py-1 px-4 rounded-md bg-indigo-600 text-white font-medium'>Login</Link>
                </div>
                :
                <form action="" className='space-y-1' onSubmit={handleSubmit}>
                    <p>Comment</p>
                    <textarea name="" id="" placeholder='Write your thoughts about the blog...'
                        className='w-full border-2 rounded border-indigo-600 outline-none p-2'
                        value={comment} onChange={(e) => setComment(e.target.value)} />
                    <button type="submit" className="py-2 px-4 rounded-md bg-indigo-600 text-white font-medium cursor-pointer"
                        disabled={isLoading}>{isLoading ? "Loading..." : "Submit"}</button>
                </form>
            }
        </div>
    )
}

export default Comments