const blogSchema = require("../models/blogSchema");
const responseHandler = require("../services/responseHandaler");
const { generateBlogSlug } = require("../services/utils");

const createBlog = async (req, res) => {
  try {
    const { title, content, isActive, tags } = req.body;
    // const authorId = req.user._id;
    if (!title) {
      return responseHandler.error(res, "Title is required", 400);
    }
    if (!content) {
      return responseHandler.error(res, "Content is required", 400);
    }
    const slug = generateBlogSlug(title);

    const existingBlog = await blogSchema.findOne({ slug });
    if (existingBlog) {
      return responseHandler.error(
        res,
        "Blog with this title already exists",
        400,
      );
    }

    const newBlog = new blogSchema({
      title,
      slug,
      content,
      author: "6967baa6465e8e92c3d60dc0",
      isActive: isActive === "true" ? true : false,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
    });
    await newBlog.save();

    responseHandler.success(res, "Blog created successfully", newBlog);
  } catch (error) {
    console.log(error);

    responseHandler.error(res, "Internal Server Error");
  }
};

const getBlog = async (req, res) => {
  try {
    const slug = req.params.slug;
    const blog = await blogSchema
      .findOne({ slug })
      .populate("author", "fullName email")
      .select("-__v -isActive");
    if (!blog) {
      return responseHandler.error(res, "Blog not found", 404);
    }
    responseHandler.success(res, "Blog fetched successfully", blog);
  } catch (error) {
    responseHandler.error(res, "Internal Server Error");
  }
};

const blogList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalCount = await blogSchema.countDocuments();
    const blogs = await blogSchema
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const simplifyRes = {
      data: blogs,
      pagination: {
        page,
        limit,
        totalItems: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
    console.log("blog list");


    responseHandler.success(res, "", simplifyRes);
  } catch (error) {
    console.log(error);
  }
};

const blogListByUser = async (req, res) => {
  try {
    console.log("blog list by user");

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalCount = await blogSchema.countDocuments();
    const blogs = await blogSchema
      .find({ author: req.user._id }).populate("author", "fullName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const simplifyRes = {
      data: blogs,
      pagination: {
        page,
        limit,
        totalItems: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
    responseHandler.success(res, "", simplifyRes);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createBlog, getBlog, blogList, blogListByUser };
