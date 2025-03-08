import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.accessToken
    if (!token) {
        return res.status(401).json({ success: false, message: "Un Authorized! Please Login" })
    }
    try {
        const decode = await jwt.verify(token, process.env.JWT_SECRET)
        if (!decode.id) {
            return res.status(401).json({ success: false, message: "Un Authorized! Please Login" })
        }

        req.userId = decode.id

        next()

    } catch (error) {
        console.log(`error in verify token middleware : ${error.message}`)
        return res.status(500).json({ success: false, message: "User Verify Failed" })
    }
} 