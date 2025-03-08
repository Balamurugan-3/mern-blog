import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const Register = async (req, res) => {

    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Inputs Fields are Required" })
    }
    try {

        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({ success: false, message: "Email is Already Registered" })
        }

        // hash password

        // crate user
        const user = new User({
            name, email, password
        })
        await user.save()

        return res.status(201).json({
            success: true, message: "User Created Successfully",
            user: {
                name, email, role: user.role
            }
        })
    } catch (error) {
        console.log(`error in Registration controller : ${error.message} `)
        return res.status(500).json({ success: false, message: "Registration Failed" })
    }
}


export const Login = async (req, res) => {

    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Inputs Fields are Required" })
    }
    try {

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, message: "Email or Password is Wrong" })
        }

        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.status(404).json({ success: false, message: "Email or Password is Wrong" })
        }

        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            success: true, message: "User Login Successfully",
            user: {
                name: user.name,
                email: user.email,
                bio: user.bio,
                avatar: user.avatar,
                role: user.role,
                _id: user._id
            },
            token
        })
    } catch (error) {
        console.log(`error in Login controller : ${error.message} `)
        return res.status(500).json({ success: false, message: "Login Failed" })
    }
}



// undertand this its not hard just thing its easy to write the code
export const GoogleLogin = async (req, res) => {

    const { name, email, avatar } = req.body

    try {

        let user = await User.findOne({ email })
        if (!user) {
            // random password 
            // if you have error on number to change the password toString() -> its will work
            const password = Math.round(Math.random() * 10000000)
            // password hash automatically

            // crate user
            const user = new User({
                name, email, password, avatar
            })

            user = await user.save()
        }


        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            success: true, message: "User Login Successfully",
            user: {
                name: user.name,
                email: user.email,
                bio: user.bio,
                avatar: user.avatar,
                role: user.role,
                _id: user._id
            },
            token
        })
    } catch (error) {
        console.log(`error in Google controller : ${error.message} `)
        return res.status(500).json({ success: false, message: "Google Login Failed" })
    }
}


export const logout = async (req, res) => {

    try {

        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0
        })

        return res.status(200).json({
            success: true,
            message: "Logout Successfully"
        })
    } catch (error) {
        console.log(`error in logout controller : ${error.message} `)
        return res.status(500).json({ success: false, message: "logout  Failed" })
    }
}


export const getMe = async (req, res) => {

    const userId = req.userId
    try {

        let user = await User.findById(userId).select("-password")
        if (!user) {
            return res.status(400).json({ success: false, message: "User Not Found" })
        }
        return res.status(200).json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                bio: user.bio,
                avatar: user.avatar,
                role: user.role,
                _id: user._id
            }
        })
    } catch (error) {
        console.log(`error in getMe controller : ${error.message} `)
        return res.status(500).json({ success: false, message: "getMe Data Failed" })
    }
}