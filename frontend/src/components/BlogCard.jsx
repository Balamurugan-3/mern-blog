import React from 'react'
import moment from "moment"
import { Link } from "react-router-dom"
import { CiCalendarDate } from "react-icons/ci";
import userIcon from "../assets/user.png"

const BlogCard = ({ blog }) => {

    return (
        <Link to={`/blog/${blog?.category.slug}/${blog?._id}`} className='border p-4 space-y-2'>
            {/* author img & name */}
            <div>
                <div className='flex gap-3 items-center'>
                    <img src={blog?.author.avatar || userIcon} alt="" className='size-10 rounded-full' loading='lazy' />
                    <span className='text-sm'>{blog?.author.name}</span>
                </div>
            </div>

            {/* blog - blog */}
            <div>
                <img src={blog?.image} alt="" className='h-48 sm:h-40 md:h-52 w-full object-cover rounded-md' loading='lazy' />
            </div>

            {/* blog publish date & title */}
            <div className='space-y-1 my-1'>
                <p className='flex items-center gap-1'>
                    <CiCalendarDate className='text-lg' />
                    <span className='text-xs text-gray-600'>{moment(blog?.createdAt).fromNow()}</span>
                </p>
                <h2 className='text-lg lg:text-lg font-medium line-clamp-2'>{blog?.title}</h2>
            </div>

        </Link>
    )
}

export default BlogCard