import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaRegHeart } from "react-icons/fa";
import { useGetLikeCountsQuery, useToggleLikeMutation } from '../../../store/features/blogLike/blogLikeAPI';
import { useSelector } from 'react-redux';

const LikeCount = ({ blogId }) => {
  const [liked, setLiked] = useState(false)

  const { userData ,isLoggedIn } = useSelector(state => state.user)

  const { data, isLoading } = useGetLikeCountsQuery({ blogId, user: userData?._id })
  // console.log("like,", data)

  // if(isLoading){
  //   return <div>Loading...</div>
  // }




  const [toggleLike, { isLoading: isLiking }] = useToggleLikeMutation() // toggle Like


  const handleLike = async () => {
    if (!isLoggedIn) {
      return toast.error("Please Login Your Account")
    }
    const data = {
      user: userData?._id,
      blogId
    }
    try {
      const res = await toggleLike(data).unwrap()
      if (res) {
        toast.success(res.message)
        setLiked(res.loginUser)
      }
    } catch (error) {
      toast.success(error.data.message)
    }
  }


  useEffect(() => {
    if (isLoading) {
      setLiked(false);
    }
    else if (data?.loginUser !== undefined) {
      setLiked(data?.loginUser);
    }
    else {
      setLiked(false);
    }
  }, [data, blogId])


  return (
    isLiking || isLoading ?
      <div className='size-8 rounded-full border-2 border-t-0 border-r-0 animate-spin border-green-600'></div>
      :
      <button className='flex items-center gap-1' onClick={handleLike}>
        <FaRegHeart className={`text-lg sm:text-xl ${liked ? 'text-red-600' : 'text-black'}`} />
        <span>{data?.likeCount || 0}</span>
      </button>
  )
}

export default LikeCount