import React from 'react'
import { useGetCommentsQuery } from '../store/features/comments/commentAPI'
import { useParams } from 'react-router-dom'
import moment from "moment"

const CommentsCard = () => {
  const { blogId } = useParams()
  const { data: comments, isLoading } = useGetCommentsQuery(blogId)
  if (isLoading) return <div>Loading...</div>
  return (
    <div>
      {comments?.comments && comments?.comments.length === 0 && <div className='p-3 text-red-600'>No Comments Here</div>}

      <h3 className="text-lg font-medium">{comments?.comments.length} Comments</h3>
      {comments?.comments && comments?.comments.length > 0 &&

        comments?.comments?.map((c) => (
          < div className = 'my-7 rounded-md'key={c._id} >

          <section className='flex gap-3'>
            <div className=' '>
              <img src={c.author.avatar} alt="" className='w-12 h-12 min-w-12 object-cover rounded-full' />
            </div>

            <div className="">
              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-medium'>{c.author.name}</p>
                  <p className='text-xs text-gray-600'>{moment(c.createdAt).fromNow()}</p>
                </div>
                <div>
                  *
                </div>

              </div>
              <div className='mt-2 text-sm pr-5'>
                {c.comment}
              </div>
            </div>

          </section>

          </div>
  ))
}
    </div >
  )
}

export default CommentsCard