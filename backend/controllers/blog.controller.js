import Blog from "../models/blog.model.js"
import cloudinary from "cloudinary"
import Category from "../models/category.model.js"

export const createBlog = async (req, res) => {
    try {
        // console.log(req.file)
        // console.log("req:",req)
        const data = JSON.parse(req.body.data)
        // console.log("req.body.data",req.body.data)

        let image = ""
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
            image = uploadResult.secure_url
        } else {
            return res.status(400).json({ success: false, message: "Image is Required" })
        }

        const newBlog = new Blog({
            ...data,
            image
        })
        await newBlog.save()

        // console.log("newBlog", newBlog)
        return res.status(200).json({
            success: true,
            message: "New Blog Added Successfully"
        })
    } catch (error) {
        console.log(`error in create blog controller : ${error.message} `)
        return res.status(500).json({ success: false, message: "create blog  Failed" })
    }
}
export const updateBlog = async (req, res) => {
    try {
        // console.log("data",req.body.data)
        const data = JSON.parse(req.body.data)
        const { blogId } = req.params
        if (!blogId) {
            return res.status(400).josn({ success: false, message: "Blog Not Found" })
        }
        let image = ""
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
            image = uploadResult.secure_url
        }

        let blogData;
        if (image) {
            blogData = {
                ...data,
                image
            }
        }
        else {
            blogData = { ...data }
        }
        // console.log("blogData-----------:::", blogData)
        const blog = await Blog.findByIdAndUpdate(blogId, { ...blogData })
        // console.log("updated data in db-----------:::", blog)

        if (!blog) {
            return res.status(400).json({ success: false, message: "Failed to update blog" })
        }

        return res.status(200).json({
            success: true,
            message: "Blog Updated Successfully"
        })
    } catch (error) {
        console.log(`error in update blog controller : ${error.message} `)
        return res.status(500).json({ success: false, message: "update blog Data Failed" })
    }
}
export const deleteBlog = async (req, res) => {
    try {
        const { blogId } = req.params

        const blog = await Blog.findByIdAndDelete(blogId)
        // console.log("updateblog", blog)

        if (!blog) {
            return res.status(400).json({ success: false, message: "Failed to delete blog" })
        }

        return res.status(200).json({
            success: true,
            message: "Blog deleted Successfully"
        })
    } catch (error) {
        console.log(`error in  blog delete controller : ${error.message} `)
        return res.status(500).json({ success: false, message: "blog deleted Failed" })
    }
}
export const getAllBlogs = async (req, res) => {
    try {
        let blogs = await Blog.find().populate("category", "name slug").populate("author", "name avatar role").sort({ createdAt: -1 })
        // console.log("blogs", blogs)

        if (!blogs) {
            return res.status(400).json({ success: false, message: "Failed to get all blog" })
        }

        return res.status(200).json(blogs)

    } catch (error) {
        console.log(`error in get all blog controller : ${error.message} `)
        return res.status(500).json({ success: false, message: "Failed toget all blogs" })
    }
}

export const getSingleBlog = async (req, res) => {
    try {
        const { blogId } = req.params

        let blog = await Blog.findById(blogId).populate("category", "name").populate("author", "name avatar role")
        // console.log("blogs", blog)

        if (!blog) {
            return res.status(400).json({ success: false, message: "Failed to get a blog" })
        }

        return res.status(200).json(blog)

    } catch (error) {
        console.log(`error in get  blog controller : ${error.message} `)
        return res.status(500).json({ success: false, message: "Failed to get blog" })
    }
}



export const RelatedBlogs = async (req, res) => {
    try {
        // blog is a has an Id -In what post we see
        const { category, blog } = req.params //pass the slug name - its stored in category
        // console.log("category", category)

        const categoryData = await Category.findOne({ slug: category }) // get the category Id - using the slug name
        // console.log("data",categoryData)

        if (!categoryData) {
            return res.status(400).json({ success: false, message: "Category not found" })
        }

        // the model allow category ID only - the logic top
        let blogs = await Blog.find({ _id: { $ne: blog }, category: categoryData._id })
            .populate("category", "name slug") // get category related blogs use the id
        // console.log("related blogs", blogs)

        if (!blogs) {
            return res.status(400).json({ success: false, message: "Dont have related blogs" })
        }

        return res.status(200).json(blogs)

    } catch (error) {
        console.log(`error in get  blog controller : ${error.message} `)
        return res.status(500).json({ success: false, message: "Failed to get blog" })
    }
}


export const getBlogsWithCategory = async (req, res) => {
    try {
        const { category } = req.params
        // console.log("category", category)

        const categoryData = await Category.findOne({ slug: category })

        if (!categoryData) {
            return res.status(400).json({ success: false, message: "Category not found" })
        }

        let blogs = await Blog.find({ category: categoryData._id }).sort({ createdAt: -1 })
            .populate("author", "name role avatar").populate("category")

        if (!blogs) {
            return res.status(400).json({ success: false, message: "No blogs" })
        }

        return res.status(200).json(blogs)

    } catch (error) {
        console.log(`error in get blog with category controller : ${error.message} `)
        return res.status(500).json({ success: false, message: "Failed to get blog with category" })
    }
}

export const search = async (req, res) => {
    try {
        const { q } = req.query
        // console.log("q", q)
        // console.log("type", typeof q)

        if (!q) {
            return res.status(400).json({ success: false, message: "Search keyword is Required" })
        }

        let blogs = await Blog.find({ title: { $regex: q, $options: "i" } }).sort({ createdAt: -1 })
            .populate("category", "slug name").populate("author", "name avatar role")

        if (!blogs) {
            return res.status(400).json({ success: false, message: "No blogs Found" })
        }

        return res.status(200).json(blogs)

    } catch (error) {
        console.log(`error in get blog with category controller : ${error.message} `)
        return res.status(500).json({ success: false, message: "Failed to get blog with category" })
    }
}