import { useState } from "react";
import TiptapEditor from "../components/utils/TipTapEditor";

export default function NewBlogPost() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    setSlug(
      value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const blogData = {
      title,
      slug,
      content, // HTML from Tiptap
    };

    console.log("Blog submitted:", blogData);

    // TODO: POST to backend
  };

  return (
    <div className='w-full'>
      <div className="container p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Blog</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Blog Title
            </label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring focus:ring-blue-300"
              placeholder="Enter blog title"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Slug
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Content
            </label>
            <TiptapEditor content={content} onChange={setContent} />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Publish Blog
          </button>
        </form>
      </div>
    </div>
  );
}
