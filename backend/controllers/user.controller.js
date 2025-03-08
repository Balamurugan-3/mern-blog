import mongoose from "mongoose"
import User from "../models/user.model.js"
import cloudinary from "../config/clodinary.js"

export const getUser = async (req, res) => {
    const { id } = req.params
    // console.log(id)
    if (!mongoose.Types.ObjectId.isValid(id) || !id) {
        return res.status(400).json({ success: false, message: "Invalid User Id" })
    }

    try {
        const user = await User.findById(id).select("-password")
        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" })
        }
        // console.log("user", user)
        return res.status(200).json({ success: true, message: "Successfully Get User", user })

    } catch (error) {
        console.log(`error in get user details : ${error.message}`)
        return res.status(500).json({ success: false, message: "Failed to Get a User" })
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id) || !id) {
        return res.status(400).json({ success: false, message: "Invalid User Id" })
    }

    try {
        const data = JSON.parse(req.body.user) // i use json.stringify in frontend
        // console.log("user", data)

        const user = await User.findById(id).select("-password")
        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" })
        }

        // console.log(" req.file.filePath :", req.file)
        if (req.file) {
            // Upload an image
            const uploadResult = await cloudinary.uploader
                .upload(
                    req.file.path, { folder: "mern-blog", resource_type: "auto" }
                )
                .catch((error) => {
                    console.error(error);
                    return res.status(400).json({ success: false, message: "Image Upload failed" })
                });

            // console.log("uploadResult", uploadResult.secure_url);
            user.avatar = uploadResult.secure_url
        }

        user.name = data.name;
        user.email = data.email
        user.bio = data.bio

        await user.save()
        // update user


        return res.status(200).json({ success: true, message: "Successfully User Updated", user })

    } catch (error) {
        console.log(`error in updateUser details : ${error.message}`)
        return res.status(500).json({ success: false, message: "Failed to updateUser" })
    }
}


export const deleteUser = async (req, res) => {

    const { id } = req.params
    // console.log(id)
    if (!mongoose.Types.ObjectId.isValid(id) || !id) {
        return res.status(400).json({ success: false, message: "Invalid User Id" })
    }

    try {
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).json({ success: false, message: "failed to delete the user" })
        }
        // console.log("user", user)
        return res.status(200).json({ success: true, message: "User Deleted Successfully" })

    } catch (error) {
        console.log(`error in delate user  : ${error.message}`)
        return res.status(500).json({ success: false, message: "Failed to delete a User" })
    }
}
export const getAllUsers = async (req, res) => {

    try {
        const users = await User.find().sort({ createdAt: -1 })
        if (!users) {
            return res.status(404).json({ success: false, message: "No Users Found" })
        }
        // console.log("user", user)
        return res.status(200).json(users)

    } catch (error) {
        console.log(`error in get all users  : ${error.message}`)
        return res.status(500).json({ success: false, message: "Failed to get all Users" })
    }
}