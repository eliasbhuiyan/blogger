import React from "react";
import { Link } from "react-router";
import { useGetUserQuery } from "../../service/api";

const Navbar = () => {
    const { data, isLoading, error } = useGetUserQuery()
    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-xl font-bold text-gray-800"
                    >
                        MyBlog
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            to="/"
                            className="text-gray-600 hover:text-gray-900 transition"
                        >
                            Blogs
                        </Link>

                        <Link
                            to="/about"
                            className="text-gray-600 hover:text-gray-900 transition"
                        >
                            About
                        </Link>

                        <Link
                            to="/contact"
                            className="text-gray-600 hover:text-gray-900 transition"
                        >
                            Contact
                        </Link>
                    </div>

                    {/* Right Section */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            to="/login"
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            Login
                        </Link>

                        <Link
                            to="/signup"
                            className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                        >
                            Sign Up
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button className="text-gray-600 hover:text-gray-900">
                            ☰
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;


// Backend server structure
// RTK query
// Socket
// NextJs 
