import React from 'react'
import BlogCard from '../components/ui/BlogCard'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { useBlogDetailsQuery } from '../service/api'
import Loading from '../components/ui/Loading'
import { useParams } from 'react-router'

const BlogDetails = () => {
    const { slug } = useParams()
    const { data, isLoading, error } = useBlogDetailsQuery(slug)
    if (isLoading) return <Loading />
    console.log(data)
    return (
        <section>
            <div className="container my-40">
                {/* Blog Details */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{data?.data?.author?.fullName}</span>
                    <span>{new Date(data?.data?.createdAt).toLocaleDateString()}</span>
                </div>

                {/* Title */}
                <h3 className="mt-3 text-xl font-semibold text-gray-800">
                    {data?.data?.title}
                </h3>

                {/* Description */}
                <div className="mt-2 text-gray-600 line-clamp-3 overflow-visible whitespace-normal block" dangerouslySetInnerHTML={{ __html: data?.data?.content }} />

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