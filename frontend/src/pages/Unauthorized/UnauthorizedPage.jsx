import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UnauthorizedPage = () => {
    const { userData } = useSelector(state => state.user)
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='text-center'>

                <h1 className='text-3xl font-medium text-red-600'>Unauthorized Page</h1>

                <div className='my-5'>
                    {userData && userData.role === "user" ?
                        <Link to="/" className='px-6 py-2 bg-blue-600 text-white font-medium rounded-md'>Home</Link>
                        :
                        <Link to="/login" className='px-6 py-2 bg-blue-600 text-white font-medium rounded-md'>Login</Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default UnauthorizedPage