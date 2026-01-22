const express = require("express");
const { createBlog, getBlog, blogList } = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/upload", authMiddleware, createBlog);

router.get("/read/:slug", getBlog);
router.get("/list", blogList)

module.exports = router;
