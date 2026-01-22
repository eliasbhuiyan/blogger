import React from "react";
import { Link } from "react-router";

const BlogCard = ({
    title,
    description,
    image,
    author,
    date,
    readTime,
    slug,
}) => {
    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            {/* Image */}
            {image && (
                <img
                    src={image}
                    alt={title}
                    className="h-48 w-full object-cover"
                />
            )}

            <div className="p-5">
                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{author}</span>
                    <span>{date}</span>
                </div>

                {/* Title */}
                <h3 className="mt-3 text-xl font-semibold text-gray-800">
                    {title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-gray-600 line-clamp-3">
                    {description}
                </p>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                        {readTime} min read
                    </span>

                    <Link
                        to={`/blog/${slug}`}
                        className="text-sm font-medium text-blue-600 hover:underline"
                    >
                        Read more →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
