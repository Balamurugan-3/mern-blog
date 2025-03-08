import React from 'react'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import moment from 'moment';
import toast from 'react-hot-toast';
import { useDeleteUserMutation, useGetAllUsersQuery } from '../../store/features/user/userAPI';
import userIcon from "../../assets/user.png"
import Loading from '../../components/Loading';

const UsersPage = () => {

  const { data: users, isLoading } = useGetAllUsersQuery()
  // console.log("get all users,",users)

  //delete
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()

  const handleDeleteUser = async (id) => {
    if (confirm("Are you sure to delete ?")) {
      try {
        const res = await deleteUser(id).unwrap()
        if (res) {
          toast.success("User deleted successfully")
        }
      } catch (error) {
        toast.success("failed to delete user")
      }
    }
  }

   if(isLoading){
     return <Loading/>
   }
 

  return (
    <div className='p-3'>

      <div className='my-5 '>
        {/* <Link to="/blog-add" className='md:px-6 px-4 py-2 bg-indigo-700 text-white font-medium rounded-md '>Add Blog</Link> */}
        <h1 className='text=xl font-medium'>Users</h1>
      </div>

      {/* <div class="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border"> */}
      <div className="overflow-auto lg:overflow-visible">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-3 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased leading-none text-blue-gray-900 opacity-70">
                  Role
                </p>
              </th>
              <th className="p-3 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased leading-none text-blue-gray-900 opacity-70">
                  Name
                </p>
              </th>
              <th className="p-3 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased leading-none text-blue-gray-900 opacity-70">
                  Email
                </p>
              </th>
              <th className="p-3 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased leading-none text-blue-gray-900 opacity-70">
                  Avatar
                </p>
              </th>
              <th className="p-3 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased leading-none text-blue-gray-900 opacity-70">
                  Date
                </p>
              </th>
              <th className="p-3 border-b border-blue-gray-100 bg-blue-gray-50 mx-auto">
                <p className="block font-sans text-sm antialiased leading-none text-blue-gray-900 opacity-70">
                  Action
                </p>
              </th>
            </tr>
          </thead>

          <tbody>
            {users?.length === 0 && <div className='p-3'>No Users</div>}
            {users?.map((user) => (
              <tr key={user?._id}>
                <td className="p-3 border-b border-blue-gray-50 whitespace-normal">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {user?.role}
                  </p>
                </td>
                <td className="p-3 border-b border-blue-gray-50 whitespace-normal">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {user?.name}
                  </p>
                </td>
                <td className="p-3 border-b border-blue-gray-50 whitespace-normal">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {user?.email}
                  </p>
                </td>
                <td className="p-3 border-b border-blue-gray-50 whitespace-normal">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    <img src={user?.avatar || userIcon} alt="" className="size-8 rounded-full" />
                  </p>
                </td>
                <td className="p-3 border-b border-blue-gray-50 whitespace-normal">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {moment(user?.createdAt).format("DD-MM-YYYY HH:mm A")}
                  </p>
                </td>
                <td className="p-3 border-b border-blue-gray-50 whitespace-normal ">
                  <p className="font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 flex gap-3 flex-wrap word-break">
                    <button className="rounded" onClick={() => handleDeleteUser(user?._id)}>
                      <MdOutlineDeleteOutline className='text-xl md:text-2xl' color="red" />
                    </button>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>

    // </div>

  )
}


export default UsersPage