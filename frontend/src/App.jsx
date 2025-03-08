import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { useIsAuthQuery } from './store/features/auth/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from './store/features/user/userSlice'



const App = () => {
  const dispatch = useDispatch()
  const [showSidebar, setShowSidebar] = useState(false)
  const { isLoggedIn } = useSelector(state => state.user)

  const { data, isLoading, isSuccess } = useIsAuthQuery(undefined, {
    skip: isLoggedIn,
    refetchOnReconnect: false
  })

  useEffect(() => {
    if (!isLoggedIn && data && isSuccess) {
      dispatch(setUserData(data.user))
      // console.log("user", data.user)
    }
  }, [data, isSuccess, dispatch])

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center ">
        <div className="size-10 rounded-full border-2 border-green-600 border-r-0 border-t-0 animate-spin"></div>
      </div>
    )
  }

  const handleSidebar = () => {
    setShowSidebar((prev) => !prev)
  }

  return (
    <div>
      <div className='sticky top-0 z-20'>
        <Navbar showSidebar={showSidebar} handleSidebar={handleSidebar} />
      </div>
      <div className="flex">

        <div className={`w-72 min-h-screen  overflow-y-auto lg:max-h-[calc(100vh-4rem)] lg:overflow-hidden border-r 
        lg:sticky  transition-all duration-500 top-16 py-2 px-6  bg-white 
        ${showSidebar ? "fixed z-10 left-0" : "hidden lg:flex"}`}>
          <Sidebar />
        </div>

        <div className='w-screen min-h-screen'>
          <div className='w-full h-full p-2 md:p-4'>
            <Outlet />
          </div>

          {/* footer */}
          <div className="mt-auto w-full bg-black text-center text-white py-3">
            <Footer />
          </div>
        </div>

      </div>



    </div>

  )
}

export default App
