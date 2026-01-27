import React from 'react'
import Button from '../ui/Button'
import { Link } from 'react-router'
import { FaPlusSquare } from "react-icons/fa";
const SideBar = () => {
    return (
        <aside className='w-64 bg-gray-800 text-white h-screen flex flex-col justify-between'>
            <div className='p-4'>
                <h2 className='text-2xl font-bold'>Dashboard</h2>
            </div>
            <nav className='mt-4'>
                <ul className='text-xl'>
                    <li>
                        <Link to="/dashboard" className='block px-4 py-2 hover:bg-gray-700'>Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/new-blog" className='px-4 py-2 hover:bg-gray-700 flex items-center gap-2'><FaPlusSquare className='text-2xl' /> New Blog</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/comments" className='block px-4 py-2 hover:bg-gray-700'>Comments</Link>
                    </li>
                </ul>
            </nav>
            <div className='p-4'>
                <Button variant='danger' className='w-full'>Log-Out</Button>
            </div>
        </aside>
    )
}

export default SideBar