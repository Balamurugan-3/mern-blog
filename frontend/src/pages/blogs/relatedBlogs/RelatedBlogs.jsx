import React from 'react'
import { useGetRelatedBlogsQuery } from '../../../store/features/blog/blogAPI'
import { Link } from 'react-router-dom'

const RelatedBlogs = ({ category, blog }) => {
  const { data: relatedBlog, isLoading, isError } = useGetRelatedBlogsQuery({ category, blog })
  // console.log("blog", relatedBlog)
  return (
    <div>
      <h1 className='text-lg font-medium my-3'>Related Blogs</h1>

      {isLoading && <div>Loading</div>}
      {relatedBlog && relatedBlog?.length === 0 && <div>No Related Blogs</div>}
      {isError && <div className="text-red-500">Failed to load related blogs</div>}

      <div className='flex flex-col gap-3'>
        {relatedBlog && relatedBlog?.map((b) => (
          <Link to={`/blog/${b?.category?.slug}/${b?._id}`} key={b._id}>
          <div className="flex items-center gap-2">
            <img src={b?.image} alt="" className='w-[90px] h-[70px] object-cover rounded-md' />
            <h4 className='font-medium line-clamp-2 text-md'>
              {b?.title}
            </h4>
          </div>
          </Link>
        ))}
      </div>

    </div>
  )
}

export default RelatedBlogs