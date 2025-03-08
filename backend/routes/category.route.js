import express from "express"
import { addCategory, deleteCategory, getAllCategorys, getSingleCategory, updateCategory } from "../controllers/category.controller.js"
import { verifyToken } from "../middleware/verifyToken.js"
import { OnlyAdmin } from "../middleware/OnlyAdmin.js"


const router = express.Router()

router.get("/", getAllCategorys)
router.get("/:categoryId", verifyToken, OnlyAdmin, getSingleCategory)
router.post("/add-category", verifyToken, OnlyAdmin, addCategory)
router.put("/update-category/:categoryId", verifyToken, OnlyAdmin, updateCategory)
router.delete("/delete-category/:categoryId", verifyToken, OnlyAdmin, deleteCategory)


export default router