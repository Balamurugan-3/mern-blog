import mongoose from "mongoose"
import Comment from "../models/comment.model.js"

export const addComment = async (req, res) => {

    const { comment, author, blogId } = req.body
    // console.log(req.body)

    if (!comment || !author || !blogId) {
        return res.status(400).json({ success: false, message: "Comments Details is Required" })
    }

    try {
        const newComment = new Comment({
            author, blogId, comment
        })

        await newComment.save()
        // console.log(newComment)

        // console.log("user", user)
        return res.status(200).json({ success: true, message: "Comment Added Successfully", comment: newComment })

    } catch (error) {
        console.log(`error in addComment : ${error.message}`)
        return res.status(500).json({ success: false, message: "Failed to add Comment" })
    }
}


export const getComments = async (req, res) => {

    const { blogId } = req.params
    // console.log(id)
    if (!blogId || !mongoose.Types.ObjectId.isValid(blogId)) {
        return res.status(400).json({ success: false, message: "Invalid Comment Id or Text" })
    }

    try {
        const comment = await Comment.find({ blogId }).sort({ createdAt: -1 })
            .populate("author", "name role avatar")


        // console.log("user", user)
        return res.status(200).json({
            success: true, message: "Get Comments Successfully",
            comments: comment
        })

    } catch (error) {
        console.log(`error in get all Comments : ${error.message}`)
        return res.status(500).json({ success: false, message: "Failed to get all Comments" })
    }
}

export const getCommentsCount = async (req, res) => {

    const { blogId } = req.params
    // console.log(id)
    if (!blogId || !mongoose.Types.ObjectId.isValid(blogId)) {
        return res.status(400).json({ success: false, message: "BlogId is Required" })
    }

    try {
        const commentCounts = await Comment.countDocuments({ blogId })

        // console.log("user", user)
        return res.status(200).json({
            success: true,
            commentCounts
        })

    } catch (error) {
        console.log(`error in get  Comments count : ${error.message}`)
        return res.status(500).json({ success: false, message: "Failed to get Comments count" })
    }
}

export const getAllComments = async (req, res) => {

    // console.log("comments indside hero entry",)
    try {

        const comments = await Comment.find().sort({ createdAt: -1 })
            .populate("blogId", "title").populate("author", "name")

        // console.log("comments",comments)

        // console.log("user", user)
        return res.status(200).json(comments)

    } catch (error) {
        console.log(`error in get all Comments : ${error.message}`)
        return res.status(500).json({ success: false, message: "Failed to get all Comments" })
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params
        // console.log(id)

        const comment = await Comment.findByIdAndDelete(id)
        if (!comment) {
            return res.status(400).json({ success: false, message: "failed to delete the comment" })
        }

        return res.status(200).json({ success: true, message: "Comment Deleted Successfully" })

    } catch (error) {
        console.log(`error in delete  Comment : ${error.message}`)
        return res.status(500).json({ success: false, message: "Failed to delete Comment" })
    }
}
