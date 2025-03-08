import express from "express"
import { createBlog, deleteBlog, getAllBlogs, getBlogsWithCategory, getSingleBlog, RelatedBlogs, search, updateBlog } from "../controllers/blog.controller.js"
import upload from "../config/multer.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()

router.post("/create-blog",verifyToken, upload.single("file"), createBlog)
router.put("/update-blog/:blogId",verifyToken,  upload.single("file"), updateBlog)
router.delete("/delete-blog/:blogId",verifyToken,  deleteBlog)

router.get("/blog-category/:category", getBlogsWithCategory)
router.get("/search", search)
router.get("/related-blog/:category/:blog", RelatedBlogs)
router.get("/blogs", getAllBlogs)
router.get("/blog/:blogId", getSingleBlog)

export default router