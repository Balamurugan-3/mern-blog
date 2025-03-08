import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import GoogleLogin from './GoogleLogin'
import { useRegisterUserMutation } from '../../store/features/auth/authAPI'
import toast from 'react-hot-toast'

const UserRegister = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const [registerUser, { isLoading }] = useRegisterUserMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { name, email, password }
    try {
      const res = await registerUser(data).unwrap()
      toast.success("Registration Success")
      // Add a short delay before navigation
      navigate("/login")
    } catch (error) {
      toast.error("Registration failed")
    }
  }

  return (
    <section className='w-screen h-screen  flex justify-center items-center
    md:p-5 p-2'>

      <div className='w-96 bg-indigo-50 rounded-md md:px-10 p-4 md:py-5'>
        <h1 className='text-2xl font-bold text-center'>Create An Account</h1>
        <div className='mt-4'>
          <GoogleLogin />
          <div className='mt-5 border-2 relative flex justify-center'>
            <span className="absolute -top-3 bg-indigo-50  px-2">OR</span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 my-4">
            <div className='flex flex-col '>
              <label className='text-base font-medium ms-1'>Name</label>
              <input type="text" placeholder='Name' value={name}
                className='py-2 px-3 border rounded-md outline-green-500'
                onChange={(e) => setName(e.target.value)} />
            </div>
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
            disabled={isLoading} >Create Account</button>
          <p className='my-3 text-center text-sm'>Already have an account?
            <Link to="/login" className="text-indigo-700 font-medium"> Login</Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default UserRegister