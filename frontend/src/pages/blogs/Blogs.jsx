import React from 'react'
import { useGetAllBlogsQuery } from '../../store/features/blog/blogAPI'
import BlogCard from '../../components/BlogCard'
import { Link } from "react-router-dom"
import Loading from '../../components/Loading'

const Blogs = () => {
    const { data: blogs, isLoading } = useGetAllBlogsQuery()
    // console.log("b", blogs)
    if (isLoading) {
        return <Loading />
    }
    return (
        <>
            <div className="grid max-xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {blogs && blogs.length > 0 ?
                    blogs.map((blog) => (
                        <BlogCard blog={blog} key={blog._id} />
                    ))
                    :
                    <div>No Blogs Found</div>
                }
            </div>
        </>
    )
}

export default Blogs