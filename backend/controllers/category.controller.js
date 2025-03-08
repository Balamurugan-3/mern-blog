import Category from "../models/category.model.js"

export const addCategory = async (req, res) => {
    const { name, slug } = req.body
    if (!name || !slug) {
        return res.status(400).json({ success: false, message: "Name is Important" })
    }
    try {
        const category = new Category({
            name, slug
        })

        await category.save()

        return res.status(200).json({
            success: true,
            message: "Category Added Successfully"
        })
    } catch (error) {
        console.log(`error in addCategory controller : ${error.message} `)
        return res.status(500).json({ success: false, message: "failed to addCategory" })
    }
}
export const updateCategory = async (req, res) => {

    const { categoryId } = req.params
    if (!categoryId) {
        return res.status(400).json({ success: false, message: "Invalid Category" })
    }

    const { name, slug } = req.body
    if (!name || !slug) {
        return res.status(400).json({ success: false, message: "Name is Important" })
    }
    try {

        const category = await Category.findById( categoryId )
        if (!category) {
            return res.status(400).json({ success: false, message: "Category not found" })
        }

        category.name = name;
        category.slug = slug;

        await category.save()

        return res.status(200).json({
            success: true,
            message: "Category Updated Successfully"
        })
    } catch (error) {
        console.log(`error in update Category controller : ${error.message} `)
        return res.status(500).json({ success: false, message: "failed to update Category" })
    }
}


export const getAllCategorys = async (req, res) => {

    try {
        const categorys = await Category.find().sort({ createdAt: -1 })
        if (!categorys) {
            return res.status(400).json({ success: false, message: "Category not found" })
        }
        return res.status(200).json(categorys)
    } catch (error) {
        console.log(`error in get all Category controller : ${error.message} `)
        return res.status(500).json({ success: false, message: "failed to get all Category" })
    }
}

export const getSingleCategory = async (req, res) => {

    try {
        const { categoryId } = req.params

        const category = await Category.findById(categoryId)
        if (!category) {
            return res.status(400).json({ success: false, message: "Category not found" })
        }
        return res.status(200).json(category)
    } catch (error) {
        console.log(`error in get Single Category controller : ${error.message} `)
        return res.status(500).json({ success: false, message: "failed to get Single Category" })
    }
}

export const deleteCategory = async (req, res) => {

    try {
        const { categoryId } = req.params

        const category = await Category.findByIdAndDelete(categoryId)
        if (!category) {
            return res.status(400).json({ success: false, message: "Category not found" })
        }
        return res.status(200).json({
            success: true, message: "Category Deleted Successfully"
        })
    } catch (error) {
        console.log(`error in delete Category controller : ${error.message} `)
        return res.status(500).json({ success: false, message: "failed to delete Category" })
    }
}