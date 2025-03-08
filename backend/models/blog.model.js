import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    slug: {
        type: String,
        trim: true,
        required: true
    },
    content: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String,
        trim: true,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    // ratings: {
    //     type: String,
    //     trim: true,
    // },
    // likes: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     trim: true,
    // },

}, { timestamps: true })

const Blog = mongoose.model("Blog", blogSchema)
export default Blog