import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDeleteCategoryMutation, useGetAllCategoryQuery } from '../../store/features/category/CategoryAPI';
import { Link} from "react-router-dom"
import toast from "react-hot-toast"
import Loading from '../../components/Loading';

const CategoryDetails = () => {

    let { data: category, isLoading } = useGetAllCategoryQuery()

    //delete category 
    // api for delete category
    const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation()

    // delete function
    const handleDelete = async (categoryId) => {
        if (confirm("Are you sure to delete")) {
            try {
                const res = await deleteCategory(categoryId).unwrap()
                if (res) {
                    toast.success("Category Deleted successfully")
                }
            } catch (error) {
                toast.error("failed to delete the category")
            }
        }
    }

    if(isLoading){
        return <Loading/>
    }

    return (
        <div className=' min-h-[calc(100vh-4rem)] w-full flex justify-center'>

            <div className='lg:w-[80%] w-[100%]  lg:p-5 p-2 overflow-auto'>
                <div className='mb-5 '>
                    <Link to="add" className='md:px-6 px-4 py-2 bg-indigo-700 text-white font-medium rounded-md '>Add Category</Link>
                </div>

                {category?.length > 0 ?
                    <table className="w-full border border-gray-300 rounded-lg text-sm">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="p-4  border-b w-1/3">Category Name</th>
                                <th className="p-4  border-b w-1/3">Slug</th>
                                <th className="p-4  border-b w-1/3 md:text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {category?.map((c) => (
                                <tr className="border-b" key={c._id}>
                                    <td className="p-4  w-1/3">{c?.name}</td>
                                    <td className="p-4  w-1/3">{c?.slug}</td>
                                    <td className="p-4  w-1/3 flex gap-5 md:mx-auto">
                                        <Link to={`update/${c._id}`} className="rounded">
                                            <FaRegEdit className='text-xl md:text-2xl' color="green" />
                                        </Link>
                                        <button className="rounded" onClick={() => handleDelete(c._id)}>
                                            <MdOutlineDeleteOutline className='text-xl md:text-2xl' color="red" />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    :
                    <div className='text-red-600 p-3'>No Categories Found</div>
                }

            </div>
        </div >
    )
}

export default CategoryDetails