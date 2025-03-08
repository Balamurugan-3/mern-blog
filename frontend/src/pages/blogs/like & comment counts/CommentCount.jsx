import React from 'react'
import { FaRegComment } from "react-icons/fa";
import { useGetCommentsCountQuery } from '../../../store/features/comments/commentAPI';

const CommentCount = ({ blogId }) => {
  const { data: comments, isLoading } = useGetCommentsCountQuery(blogId)
  // console.log("comments", comments)
  return (
    isLoading ? (<div className='size-6 rounded-full animate-spin border-2 border-t-0 border-r-0' ></div>)
      :
      (<button className='flex items-center gap-1'>
        <FaRegComment className="text-lg sm:text-xl" />

        <span>{comments?.commentCounts}</span>

      </button>)
  )
}

export default CommentCount