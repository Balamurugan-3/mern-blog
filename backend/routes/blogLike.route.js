import express from "express"
import { likeBlog, likeCount } from "../controllers/blogLike.controller.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()

router.post("/like",verifyToken, likeBlog)
router.get("/like-count/:blogId/:user",verifyToken,  likeCount)


export default router