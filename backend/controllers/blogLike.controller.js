import BlogLike from "../models/BlogLike.model.js"

export const likeBlog = async (req, res) => {
    const { blogId, user } = req.body
    // console.log(id)
    try {
        let like;
        like = await BlogLike.findOne({ blogId, user })
        if (!like) {
            const saveLike = new BlogLike({
                blogId, user
            })
            await saveLike.save()
            return res.status(200).json({ success: true, message: "Blog Liked", loginUser: true })

        } else {
            const blog = await BlogLike.findByIdAndDelete(like._id)
            if (!blog) {
                return res.status(404).json({ success: false, message: "Failed to Unlike" })
            }
            return res.status(200).json({ success: true, message: "Blog UnLiked", loginUser: false })
        }

        // const likeCount = await BlogLike.countDocuments({ blogId })

        // return res.status(200).json(likeCount)

    } catch (error) {
        console.log(`error in like blog : ${error.message}`)
        return res.status(500).json({ success: false, message: "Failed to like a blog" })
    }
}

export const likeCount = async (req, res) => {
    const { blogId, user } = req.params
    // console.log(req.params)
    try {
        let likeCount = await BlogLike.countDocuments({ blogId })

        let loginUser = false
        if (user) {
            let userLikedExist = await BlogLike.countDocuments({ blogId, user })
            if (userLikedExist && userLikedExist > 0) {
                loginUser = true
            }
        }

        return res.status(200).json({ likeCount, loginUser })

    } catch (error) {
        console.log(`error in like Count  : ${error.message}`)
        return res.status(500).json({ success: false, message: "Failed to like Count" })
    }
}
