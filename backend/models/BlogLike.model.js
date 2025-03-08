import mongoose from "mongoose";

const BlogLikeSchema = new mongoose.Schema({
    user: { // user of like
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    },
}, { timestamps: true })

const BlogLike = mongoose.model("BlogLike", BlogLikeSchema)
export default BlogLike