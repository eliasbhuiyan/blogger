import React from 'react'
import { Outlet } from 'react-router'
import SideBar from './SideBar'

const DashboardLayout = () => {
    return (
        <div className='flex'>
            <SideBar />
            <Outlet />
        </div>
    )
}

export default DashboardLayout