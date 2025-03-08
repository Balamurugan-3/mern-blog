import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import GoogleLogin from './GoogleLogin'
import { useLoginUserMutation } from '../../store/features/auth/authAPI'
import { setUserData } from '../../store/features/user/userSlice'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'


const UserLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [loginUser, { isLoading }] = useLoginUserMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { email, password }
    try {
      const res = await loginUser(data).unwrap()
      if (res) {
        // console.log("logindata",res)
        await dispatch(setUserData(res.user))
        navigate("/")
        toast.success("Login Success")
      }
    } catch (error) {
      toast.error("Login failed")
    }
  }

  return (
    <section className='w-screen h-screen  flex justify-center items-center
    md:p-5 p-2'>

      <div className='w-96 bg-indigo-50 rounded-md md:px-10 p-4 md:py-5'>
        <h1 className='text-2xl font-bold text-center'>Login Account</h1>
        <div className='mt-4'>
          <GoogleLogin />
          <div className='mt-5 border-2 relative flex justify-center'>
            <span className="absolute -top-3 bg-indigo-50  px-2">OR</span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 my-4">
            <div className='flex flex-col '>
              <label className='text-base font-medium ms-1'>Email</label>
              <input type="email" placeholder='Email' value={email}
                className='py-2 px-3 border rounded-md outline-green-500'
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='flex flex-col '>
              <label className='text-base font-medium ms-1'>Password</label>
              <input type="password" placeholder='Password' value={password}
                className='py-2 px-3 border rounded-md outline-green-500'
                onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          {/* button */}
          <button className='my-1 w-full py-2 bg-indigo-700 text-white font-medium rounded-md'
            disabled={isLoading} >Login</button>
          <p className='my-3 text-center text-sm'>Don't have an account?
            <Link to="/register" className="text-indigo-700 font-medium"> Register</Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default UserLogin




