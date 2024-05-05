import { categoryModel } from "../Model/Category.model.js";

export const addCategory = async (req, res) => {
    const { name, parentCategory, properties } = req.body;
    try {
        const categoryDoc = await categoryModel.create({
            name,
            parent: parentCategory || undefined,
            properties,
        });
        res.status(200).json(categoryDoc);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error creating category', error });
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find().populate('parent');
        res.status(200).json(categories);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error getting categories', error });
    }
}

export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await categoryModel.findByIdAndDelete(id);
        res.status(200).json(category);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error deleting category', error });
    }
}

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, parentCategory, properties } = req.body;
    // console.log(name, parentCategory, properties)
    try {
        const category = await categoryModel.findByIdAndUpdate(id, {
            name,
            parent: parentCategory || undefined,
            properties
        });
        res.status(200).json(category);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error updating category', error });
    }
}