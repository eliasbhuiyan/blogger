import React from 'react'

const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto px-4">
                    <p className="text-center">
                        &copy; {new Date().getFullYear()} Blog. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default Footer