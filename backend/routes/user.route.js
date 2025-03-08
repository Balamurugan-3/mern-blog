import express from "express"
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.controller.js"
import upload from "../config/multer.js"
import { OnlyAdmin } from "../middleware/OnlyAdmin.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()

router.get("/get-user/:id", getUser) // profile update
router.put("/update-user/:id", verifyToken, upload.single("file"), updateUser)

router.delete("/delete-user/:id", verifyToken, OnlyAdmin, deleteUser)
router.get("/users", verifyToken, OnlyAdmin, getAllUsers)


export default router