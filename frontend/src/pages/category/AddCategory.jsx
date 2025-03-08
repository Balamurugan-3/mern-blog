import React, { useEffect, useState } from 'react'
import slugify from "slugify"
import { useAddCategoryMutation } from '../../store/features/category/CategoryAPI'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const AddCategory = () => {
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")

  const navigate = useNavigate()
  const [addCategory, { isLoading }] = useAddCategoryMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { name, slug }
    try {
      const res = await addCategory(data).unwrap()
      if (res) {
        // console.log(res)
        navigate("/category")
        toast.success("New category added successfully")
      }
    } catch (error) {
      toast.error("Failed to Add category")
    }
  }


  useEffect(() => {
    if (name.trim() === "") {
      setSlug("")
    }
    else {
      setSlug(slugify(name, { lower: true }));
    }
  }, [name]);

  return (
    <section className='flex w-full h-full justify-center items-center'>

      <div className='md:w-96 w-[100%] bg-indigo-50 rounded-md  p-4'>
        <h1 className='font-medium text-lg text-blue-600'>Add Category</h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 my-4">
            <div className='flex flex-col gap-2'>
              <label className='text-base font-medium ms-1'>Name</label>
              <input type="text" placeholder='Email' value={name}
                className='py-2 px-3 border rounded-md outline-none'
                onChange={(e) => setName(e.target.value)} name='name' />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-base font-medium ms-1'>Slug</label>
              <input type="text" placeholder='Password' value={slug}
                className='py-2 px-3 border rounded-md outline-none'
                onChange={(e) => setSlug(e.target.value)} name='slug' readOnly />
            </div>
          </div>

          {/* button */}
          <button className='my-1 w-full py-2 bg-indigo-700 text-white font-medium rounded-md'
          >Add Category</button>

        </form>
      </div>
    </section>
  )
}

export default AddCategory