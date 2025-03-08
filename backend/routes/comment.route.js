import express from "express"
import { addComment, deleteComment, getAllComments, getComments, getCommentsCount } from "../controllers/comment.controller.js"
import { verifyToken } from "../middleware/verifyToken.js"
import { OnlyAdmin } from "../middleware/OnlyAdmin.js"

const router = express.Router()

router.get("/get-all-comments", verifyToken, OnlyAdmin, getAllComments)
router.delete("/delete-comment/:id", verifyToken, OnlyAdmin, deleteComment)

router.get("/:blogId", getComments)
router.post("/add-comment", verifyToken, addComment)
router.get("/count-comment/:blogId", verifyToken, getCommentsCount)



// get all commets - total



export default router