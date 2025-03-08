import express from "express"
import { getMe, GoogleLogin, Login, logout, Register } from "../controllers/auth.controller.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()

router.post("/register", Register)
router.post("/login", Login)
router.post("/google-login", GoogleLogin)
router.post("/logout", logout)

router.get("/isAuth", verifyToken, getMe)

export default router