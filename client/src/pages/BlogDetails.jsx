import React from 'react'
import BlogCard from '../components/ui/BlogCard'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

const BlogDetails = () => {
    return (
        <section>
            <div className="container my-40">
                {/* Blog Details */}
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

                {/* Leave comment */}
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Leave a Comment
                    </h2>
                    <form className="mt-4 space-y-4">
                        <Input
                            label="Name"
                            type="text"
                            placeholder="Enter your name"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            label="Comment"
                            type="textarea"
                            placeholder="Enter your comment"
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button type="submit">Post Comment</Button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default BlogDetails