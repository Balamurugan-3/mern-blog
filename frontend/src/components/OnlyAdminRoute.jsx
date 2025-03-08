import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Loading from './Loading'

const OnlyAdminRoute = () => {
    const { userData, isLoggedIn } = useSelector(state => state.user)

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        if (userData !== undefined && userData !== null) {
            setLoading(false)
        }
    }, [userData])

    if (loading) return <Loading />

    return userData.role === "admin" ? <Outlet /> : <Navigate to="/unauthorized" replace />


}

export default OnlyAdminRoute