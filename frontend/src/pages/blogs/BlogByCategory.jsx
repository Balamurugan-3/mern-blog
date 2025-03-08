import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetBlogsWithCategoryQuery } from '../../store/features/blog/blogAPI'
import BlogCard from '../../components/BlogCard'

const BlogByCategory = () => {
    const { category } = useParams()
    const { data: blogs, isLoading } = useGetBlogsWithCategoryQuery(category)
    if (isLoading) {
        return <div className='p-3'>Loading...</div>
    }
    return (
        <>
            <h2 className="text-2xl font-medium mt-3 mb-6">{category} Blogs</h2>

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

export default BlogByCategory