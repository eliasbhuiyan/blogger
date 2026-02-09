const express = require("express");
const { createBlog, getBlog, blogList, blogListByUser } = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/upload", createBlog);

router.get("/read/:slug", getBlog);
router.get("/list", blogList)
router.get("/list-by-user", authMiddleware, blogListByUser)

module.exports = router;
