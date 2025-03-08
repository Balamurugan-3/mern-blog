import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import slugify from "slugify"
import { useGetAllCategoryQuery } from '../../store/features/category/CategoryAPI'

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles

import { useAddBlogMutation, useGetSingleBlogQuery, useUpdateBlogMutation } from '../../store/features/blog/blogAPI'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import Loading from '../../components/Loading'

const UpdateBlog = () => {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")

  const [filePreview, setFilePreview] = useState()
  const [file, setFile] = useState()


  const navigate = useNavigate()

  //get params id
  const { blogId } = useParams()
  // console.log("blogId",blogId)

  const { data: categoryList, isLoading } = useGetAllCategoryQuery()
  // console.log("categoryList", categoryList)

  const { data: singleBlog, isLoading: isFetching } = useGetSingleBlogQuery(blogId)
  // console.log("data fro single blog:", singleBlog)

  const [updateBlog, { isLoading: isAdding }] = useUpdateBlogMutation()

  const { userData } = useSelector(state => state.user)
  // console.log("user",userData)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      author: userData._id
    }

    // check updated values only send backend ----
    if (title !== singleBlog?.title) data.title = title;
    if (slug !== singleBlog?.slug) data.slug = slug;
    if (category !== singleBlog?.category) data.category = category;
    if (content !== singleBlog?.content) data.content = content;
    // check updated values only send backend -----

    console.log("modified data:", data)
    const formData = new FormData()
    if (file) {
      formData.append("file", file)
    }
    formData.append("data", JSON.stringify(data))

    try {
      const res = await updateBlog({ blogId, formData }).unwrap()
      if (res) {
        toast.success("Blog Updated successfully")
        navigate("/blogs")
      }
    } catch (error) {
      toast.error("failed to update Blog")
    }
  }

  useEffect(() => {
    if (title === "") {
      setSlug("")
    }
    else {
      setSlug(slugify(title, { lower: true }))
    }
  }, [title])



  // useeffect for set intial data
  useEffect(() => {
    if (singleBlog) {
      setTitle(singleBlog?.title)
      setCategory(singleBlog?.category?._id)
      setContent(singleBlog?.content)
      setFilePreview(singleBlog?.image)
      setSlug(singleBlog?.slug)
    }
  }, [singleBlog])


  const handleFileUpload = async (files) => {
    const fileData = files[0];
    const preview = URL.createObjectURL(fileData)
    setFile(fileData)
    setFilePreview(preview)
  }

  if (isLoading || isFetching || isAdding) {
    return <Loading />
  }

  return (
    <section className='flex justify-center  items-center md:p-4 p-2'>

      <div className='md:full w-[95%] rounded-md md:px-6 md:py-5'>
        {/* <Link className="md:px-6 px-4 py-2 bg-indigo-700 rounded-md text-white font-medium">Add Blog</Link> */}
        <form onSubmit={handleSubmit}>
          <h1 className='text-lg font-medium'>Update Blog</h1>
          <h1 className='text-2xl font-medium mb-4'>Edit Blog</h1>
          <div className="space-y-4 my-4">
            <div className='flex flex-col gap-2'>
              <label className='text-base font-medium ms-1'>Title</label>
              <input type="text" placeholder='Title' value={title}
                className='py-2 px-3 border rounded-md outline-none'
                onChange={(e) => setTitle(e.target.value)} name='name' />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-base font-medium ms-1'>Slug</label>
              <input type="text" placeholder='Slug' value={slug}
                className='py-2 px-3 border rounded-md outline-none'
                onChange={(e) => setSlug(e.target.value)} name='name' readOnly />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-base font-medium ms-1'>Category</label>
              <select name="" id="" className='py-2 px-2 border outline-none' value={category} onChange={(e) => { setCategory(e.target.value) }}>
                <option value="">Select Category</option>
                {categoryList?.map((c) => (
                  <option key={c._id} value={`${c._id}`}>{c.name}</option>
                ))
                }
              </select>
            </div>

            <div className=' w-60'>
              <label htmlFor="" className='mb-1'>Featured Image</label>
              <Dropzone onDrop={acceptedFiles => handleFileUpload(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className=''>
                    <input {...getInputProps()} className='' />

                    <div className='w-60 h-40 border cursor-pointer rounded-lg group relative' onChange={handleFileUpload}>
                      {filePreview &&
                        <img src={filePreview} alt="" className='w-full h-full object-cover' />
                      }
                      <div className='w-full h-full bg-black bg-opacity-40 text-white absolute top-0 left-[50%] -translate-x-[50%] 
                      group-hover:flex hidden justify-center items-center
                      '>Featured Image</div>
                    </div>

                  </div>
                )}
              </Dropzone>
            </div>



            <div className='flex flex-col gap-2 w-[100%]'>
              <label className='text-base font-medium mb-1'>Blog Content</label>
              <div className='h-80 border border-gray-300 rounded-md overflow-hidden'>
                <ReactQuill
                  value={content}
                  onChange={setContent}
                  className='h-full'
                  style={{ height: "100%" }} // Fixes overflow issue
                />
              </div>
            </div>

            {/* button */}
            <button className='my-5 w-full py-2 bg-indigo-700 text-white font-medium rounded-md'
              disabled={isAdding}>
              {isAdding ?
                <div className='mx-auto size-6 border-2 border-white border-t-0 border-r-0 rounded-full animate-spin'></div>
                : "Update Blog"
              }
            </button>

          </div >
        </form>
      </div >
    </section >
  )
}

export default UpdateBlog