import User from "../models/user.model.js"

export const OnlyAdmin = async (req, res, next) => {
    const userId = req.userId
    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found Please Login" })
        }

        if (user.role !== "admin") {
            return res.status(401).json({ success: false, message: "You Are not eligible to access" })
        }
        next()

    } catch (error) {
        console.log(`error in onlyAdmin  middleware : ${error.message}`)
        return res.status(500).json({ success: false, message: "access only Admin" })
    }
} 