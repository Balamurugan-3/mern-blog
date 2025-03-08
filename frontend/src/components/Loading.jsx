import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-[calc(100vh-4rem)] flex items-center justify-center'>
        <div className="size-8 md:size-10 border-2 border-t-0 border-r-0 animate-spin border-green-600 rounded-full"></div>
    </div>
  )
}

export default Loading