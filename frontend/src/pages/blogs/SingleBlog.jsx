import React from 'react'
import { useGetSingleBlogQuery } from '../../store/features/blog/blogAPI'
import { useParams } from 'react-router-dom'
import Comments from '../../components/Comments'
import CommentsCard from '../../components/CommentsCard'
import userIcon from "../../assets/user.png"
import moment from 'moment'
import CommentCount from './like & comment counts/CommentCount'
import LikeCount from './like & comment counts/LikeCount'
import RelatedBlogs from './relatedBlogs/RelatedBlogs'

const SingleBlog = () => {
    const { blogId, category } = useParams()
    // console.log("single blog id", blogId, "category", category)
    const { data: blog, isLoading } = useGetSingleBlogQuery(blogId)
    // console.log("blog", blog)
    return (
        !isLoading ?
        (<div className='flex flex-col lg:flex-row justify-between gap-10'>

            <section className='lg:w-[70%] w-full space-y-8'>

                {/* Main - Blog Details section */}
                <section className="space-y-4 rounded border p-4 md:p-8">
                    {isLoading &&
                        <div className='flex justify-center items-center p-6'>
                            <div className='lg:size-12 size-8 rounded-full border-2 border-t-0 border-r-0 animate-spin border-green-600'></div>
                        </div>
                    }
                    {blog &&
                        <>
                            <h1 className='text-xl sm:text-2xl font-medium mb-4'>{blog?.title}</h1>

                            <div className='flex justify-between items-center'>
                                {/* left */}
                                <div className='flex items-center sm:gap-3 gap-2'>
                                    <div className='sm:size-12 size-10 '>
                                        <img src={blog.author.avatar || userIcon} alt="" className=" w-full h-full rounded-full"
                                            loading="lazy" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm sm:text-base">{blog?.author?.name}</p>
                                        <p className='text-xs sm:text-sm text-gray-700'>{moment(blog.createdAt).format("DD-MM-YYYY")}</p>
                                    </div>
                                </div>

                                {/* right */}
                                <div className='flex items-center sm:gap-5 gap-3'>
                                    <LikeCount blogId={blogId} />
                                    <CommentCount blogId={blogId} />
                                </div>
                            </div>

                            <div>
                                <img src={blog?.image} alt="blog image" className='rounded-md w-full min-h-60 max-h-96 object-cover' loading='lazy' />
                            </div>

                            <div dangerouslySetInnerHTML={{ __html: blog?.content }} className="" />
                        </>
                    }
                </section>


                {/* Comments Section */}
                <section className='rounded border p-4 space-y-8'>
                    <Comments blog={blog} />

                    <CommentsCard />
                </section>


            </section>

            <section className='border rounded lg:w-[30%] w-full p-4'>
                <RelatedBlogs category={category} blog={blogId} />
            </section>

        </div>)
        :
        <div className='w-full h-full flex justify-center items-center'>
        <div className="size-10 rounded-full border-2 border-t-0 border-r-0 animate-spin border-green-600"></div>
        </div>
    )
}

export default SingleBlog