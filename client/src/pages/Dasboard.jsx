import React from 'react'
import Card from '../components/ui/Card'
import BlogCard from '../components/ui/BlogCard'
import { useGetBlogListByUserQuery } from '../service/api'
import Loading from '../components/ui/Loading'

const Dasboard = () => {
    const { data, isLoading, error } = useGetBlogListByUserQuery()
    if (isLoading) return <Loading />
    if (error) console.log(error)
    console.log(data)
    return (
        // blog list card design
        <div className='space-y-5 flex flex-col items-center justify-center w-full'>
            {
                data?.data?.data.map((blog) => (
                    <BlogCard key={blog._id} title={blog.title} description={blog.content} image={blog.image} author={blog.author.fullName} date={blog.createdAt} readTime={blog.readTime} slug={blog.slug} />
                ))
            }
        </div>
    )
}

export default Dasboard