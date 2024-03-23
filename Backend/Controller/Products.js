
import { productModel } from "../Model/Product.model.js";
export const addProducts = async (req, res) => {
    console.log(req.body)
    try {
        const product = await productModel.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error creating product', error });
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json(products);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error getting products', error });
    }
}

export const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productModel.findById(id)
        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error getting product', error });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    console.log(id, req.body)
    try {
        const product = await productModel.findByIdAndUpdate(id, update);
        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error updating product', error });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productModel.findByIdAndDelete(id)
        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error deleting product', error });
    }
}

export const deleteImage = async (req, res) => {
    const { id } = req.params;
    const { imageUrl } = req.body
    const update = {
        $pull: { images: imageUrl }
    }
    console.log(req.body)
    try {

        await productModel.findByIdAndUpdate(id, update, { new: true, useFindAndModify: false });

        console.log('Image URL deleted successfully');
        res.status(200).json({ message: 'Image URL deleted successfully' });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error deleting image', error });
    }
}