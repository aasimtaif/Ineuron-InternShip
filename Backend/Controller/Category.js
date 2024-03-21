import { categoryModel } from "../Model/Category.model.js";

export const addCategory = async (req, res) => {
    try {
        const category = await categoryModel.create(req.body);
        res.status(200).json(category);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error creating category', error });
    }
}