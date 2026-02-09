import React from 'react'
import { Navigate, Outlet } from 'react-router'
import SideBar from './SideBar'
import { useGetUserQuery } from '../../service/api'
import Loading from '../ui/Loading'

const DashboardLayout = () => {
    const { data, isLoading, error } = useGetUserQuery()
    if (isLoading) return <Loading />;
    if (error) console.log(error);
    console.log(data);

    if (!data?.success) {
        return <Navigate to="/login" />
    }

    return (
        <div className='flex'>
            <SideBar />
            <Outlet />
        </div>
    )
}

export default DashboardLayout