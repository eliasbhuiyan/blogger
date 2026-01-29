import React from 'react'
import BlogCard from '../components/ui/BlogCard'
import { useGetBlogListQuery } from '../service/api'

const Home = () => {
    const { data, isLoading, error } = useGetBlogListQuery()
    console.log(data);


    return (
        <div className='container my-40 space-y-4 grid grid-cols-3 gap-4'>
            <BlogCard
                title="How to Build a Blog with React"
                description="Learn how to build a blog website using React, Tailwind CSS, and React Router..."
                image="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
                author="John Doe"
                date="Jan 20, 2026"
                readTime={6}
                slug="build-blog-with-react"
                className="col-span-2"
            />
            <BlogCard
                title="How to Build a Blog with React"
                description="Learn how to build a blog website using React, Tailwind CSS, and React Router..."
                image="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
                author="John Doe"
                date="Jan 20, 2026"
                readTime={6}
                slug="build-blog-with-react"
            />
            <BlogCard
                title="How to Build a Blog with React"
                description="Learn how to build a blog website using React, Tailwind CSS, and React Router..."
                image="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
                author="John Doe"
                date="Jan 20, 2026"
                readTime={6}
                slug="build-blog-with-react"
            />
            <BlogCard
                title="How to Build a Blog with React"
                description="Learn how to build a blog website using React, Tailwind CSS, and React Router..."
                image="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
                author="John Doe"
                date="Jan 20, 2026"
                readTime={6}
                slug="build-blog-with-react"
            />
            <BlogCard
                title="How to Build a Blog with React"
                description="Learn how to build a blog website using React, Tailwind CSS, and React Router..."
                image="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
                author="John Doe"
                date="Jan 20, 2026"
                readTime={6}
                slug="build-blog-with-react"
            />
            <BlogCard
                title="How to Build a Blog with React"
                description="Learn how to build a blog website using React, Tailwind CSS, and React Router..."
                image="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
                author="John Doe"
                date="Jan 20, 2026"
                readTime={6}
                slug="build-blog-with-react"
            />
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