import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSearchBlogQuery } from '../../store/features/blog/blogAPI'
import BlogCard from '../../components/BlogCard'

const SearchResult = () => {
    const [query, setQuery] = useState("")
    const [searchParams] = useSearchParams()

    useEffect(() => {
        setQuery(searchParams.get("q") || "")
    }, [searchParams])

    // console.log("search : ", query)

    const { data: blogs, isLoading } = useSearchBlogQuery(query, {
        skip: !query.trim()
    })
    // console.log("data : ", blogs)

    if (isLoading) {
        return (
            <div className='w-full h-full flex justify-center items-center'>
                <div className="size-10 rounded-full border-2 border-r-0 border-t-0 animate-spin"></div>
            </div>
        )
    }

    return (
        <>
            <h2 className="text-lg font-medium mb-5 mt-3">Search Result : <span className='text-green-700'>{query}</span></h2>
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

export default SearchResult