import { prisma } from "../config/prisma.config.js";

export const addProducts = async (req, res) => {
    console.log(req.body)
    try {
        const product = await prisma.product.create({
            data: {
                ...req.body
            }
        });
        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error creating product', error });
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error getting products', error });
    }
}

export const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.findUnique({
            where: {
                id
            }
        });
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
        const product = await prisma.product.update({
            where: {
                id
            },
            data: {
                ...req.body
            }
        });
        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error updating product', error });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.delete({
            where: {
                id
            }
        });
        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error deleting product', error });
    }
}

export const deleteImage = async (req, res) => {
    const { id } = req.params;
    const { imageUrl, images } = req.body
    console.log(req.body)
    try {
        const updatedArray = images.filter((url) => url !== imageUrl);
        await prisma.product.update({
            where: {
                id,
            },
            data: {
                images: {
                    set: updatedArray,
                },
            },
        });

        console.log('Image URL deleted successfully');
        res.status(200).json({ message: 'Image URL deleted successfully' });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error deleting image', error });
    }
}