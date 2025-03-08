import React from 'react'
import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import toast from 'react-hot-toast'

const AuthRouteProduction = () => {
    const { userData, isLoggedIn } = useSelector(state => state.user)

    if (userData && isLoggedIn) {
        return (
            <Outlet />
        )
    } else {
        toast.error("don't have permission!")
        return <Navigate to="/login" replace />
    }
}
export default AuthRouteProduction