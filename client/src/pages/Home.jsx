import React from 'react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'
import BlogCard from '../components/ui/BlogCard'

const Home = () => {
    return (
        <div className='w-5xl m-auto mt-40 space-y-4'>
            <BlogCard
                title="How to Build a Blog with React"
                description="Learn how to build a blog website using React, Tailwind CSS, and React Router..."
                image="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
                author="John Doe"
                date="Jan 20, 2026"
                readTime={6}
                slug="build-blog-with-react"
            />
        </div>
    )
}

export default Home