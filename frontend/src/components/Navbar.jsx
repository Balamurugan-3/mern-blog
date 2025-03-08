import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { IoClose, IoMenu, IoSearchOutline } from "react-icons/io5";
import { TbLogin2 } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';

import { FaRegUser } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { IoLogOutOutline } from "react-icons/io5";

import userIcon from "../assets/user.png"
import { useLogoutUserMutation } from '../store/features/auth/authAPI';
import { removeUserData } from '../store/features/user/userSlice';

import toast from "react-hot-toast"
import SearchBox from './SearchBox';


const Navbar = ({ handleSidebar, showSidebar }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [show, setShow] = useState(false)


  const [dropdown, setDropdown] = useState(false)
  const { userData, isLoggedIn } = useSelector(state => state.user)
  // console.log("userdata", userData)

  // logout API
  const [logoutUser, { isLoading }] = useLogoutUserMutation()

  const handleLogout = async () => {
    try {
      const res = await logoutUser().unwrap()
      if (res) {
        await dispatch(removeUserData())
        navigate("/login")
        toast.success("Logout Successfully")
      }
    } catch (error) {
      // console.log(`error in logout method in navbar : ${error.message}`)
      toast.error(error.message || "failed to Logout")
    }
  }

  const handleSearchShow = () => {
    // console.log("clicked")
    setShow((prev) => !prev)
  }

  const handleMenu = () => {
    handleSidebar()
  }

  return (
    <nav className="flex justify-between items-center border-b shadow-md w-full h-16 px-4 md:px-6 bg-white">

      {/* Logo */}
      <div className='flex items-center gap-2'>
        <div className='lg:hidden' onClick={handleMenu}>
          {showSidebar ?
            <IoClose className='text-3xl' />
            :
            <IoMenu className='text-3xl' />
          }
        </div>
        <Link to="/" className='text-md md:text-lg font-medium whitespace-nowrap'>One Blog ⭐</Link>
      </div>

      {/* Search Bar */}
      <div className='w-[500px] '>
        <div className={`md:relative absolute md:flex top-16 md:top-0 left-0 bg-white w-full md:px-10 px-5 py-3
        ${show ? "flex" : "hidden"} `}>
          <SearchBox />
        </div>
      </div>

      {/* Login Button */}
      <div className='max-md:flex items-center gap-4'>
        <div onClick={handleSearchShow}>
          {show ?
            <IoClose className='md:hidden text-2xl text-gray-600' />
            : <IoSearchOutline className='md:hidden text-2xl text-gray-600' />
          }
        </div>

        {!isLoggedIn ? (
          <Link to="/login" className="px-4 py-2 rounded-md bg-indigo-600 text-white font-medium flex items-center gap-1">
            <TbLogin2 className="text-xl" /> Login
          </Link>
        ) :
          (
            <div className='size-10 rounded-full  relative' onClick={() => setDropdown(!dropdown)}>
              <img src={userData?.avatar || userIcon} alt="" className='w-full h-full rounded-full' />
              {dropdown &&
                <div className='w-40 absolute text-sm top-[100%] right-2 bg-white
              flex flex-col border border-gray-200'>

                  <Link to={`profile/${userData?._id}`} className='px-4 py-2 hover:bg-gray-50 flex items-center gap-2'>
                    <FaRegUser className='text-lg' />Profile</Link>
                  <hr />
                  <button className='px-4 py-2 hover:bg-gray-50 flex items-center gap-2'
                    disabled={isLoading} onClick={handleLogout}>
                    <IoLogOutOutline className='text-xl' color="red" />Logout</button>
                </div>
              }

            </div>
          )
        }

      </div>

    </nav>
  )
}

export default Navbar
