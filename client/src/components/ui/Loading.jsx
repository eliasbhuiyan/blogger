import React from 'react'

const Loading = () => {
    return (
        <div className='h-screen w-full flex items-center justify-center gap-2'>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p>Loading...</p>
        </div>
    )
}

export default Loading