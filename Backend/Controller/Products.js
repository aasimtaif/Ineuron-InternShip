
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
        const products = await productModel.find().populate({
            path: 'review',
            populate: {
                path: 'userId',
                model: 'usersModel' // Assuming 'User' is the model name for the user details
            }
        });;
        res.status(200).json(products);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error getting products', error });
    }
}

export const getNewProducts = async (req, res) => {
    try {
        const products = await productModel.find({}).populate({
            path: 'review',
            populate: {
                path: 'userId',
                model: 'usersModel' // Assuming 'User' is the model name for the user details
            }
        }).sort({ _id: -1 }).limit(5).exec()
        res.status(200).json(products);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error getting new products', error });
    }
}

export const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productModel.findById(id).populate({
            path: 'review',
            populate: {
                path: 'userId',
                model: 'usersModel' // Assuming 'User' is the model name for the user details
            }
        });
        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error getting product', error });
    }
}
export const getFeaturedProducts = async (req, res) => {
    try {
        const products = await productModel.findById("66069926c00e8894a884fdc4").populate({
            path: 'review',
            populate: {
                path: 'userId',
                model: 'usersModel'
            }
        });
        console.log(products)
        res.status(200).json(products);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error getting featured products', error });
    }

}

export const searchProducts = async (req, res) => {
    const { q } = req.query;
    try {
        const products = await productModel.find({
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } }
            ]
        }).populate({
            path: 'review',
            populate: {
                path: 'userId',
                model: 'usersModel' // Assuming 'User' is the model name for the user details
            }
        });
        console.log(products)
        res.status(200).json(products);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error searching products', error });
    }

}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    console.log(id, req.body)
    try {
        const product = await productModel.findByIdAndUpdate(id, req.body, { new: true, useFindAndModify: false });
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

export const addProductReview = async (req, res) => {
    const { id } = req.params;
    console.log(req.body)
    try {
        const product = await productModel.findByIdAndUpdate(id, { $push: { review: req.body } }, { new: true, useFindAndModify: false });
        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error adding review', error });
    }
}