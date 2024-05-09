import { CartModel as Cart } from "../Model/Cart.model.js";
import { usersModel as User } from "../Model/User.model.js";

// Add items to the cart for a specific user
export const addToCart = async (req, res) => {
    try {
        const userId = req.body.userId; // Get the user ID from the request
        const productId = req.body.productId; // Get the product ID from the request
        const foundItem = await Cart.findOne({ 'items.product': productId });
        console.log(foundItem)
        const update =  { $inc: { 'items.$.quantiy': 1 } }
           
        const cart = await Cart.findOneAndUpdate({ userId }, update, {
            upsert: true, new: true
        }); // Find the cart for the user
        const user = await User.findByIdAndUpdate(userId, { cartItems: cart._id }); // Find the user
        res.status(200).json({ message: 'Product added to cart', cart });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const fetchCartItemsWithUserData = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find the user by ID and populate the cartItems field with product details
        const user = await User.findById(userId).populate({
            path: 'cartItems',
            populate: {
                path: 'items',
                populate: {
                    path: 'product',
                    model: 'productModel',
                    options: { strictPopulate: false } // Set strictPopulate to false
                }

            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract the cart items with product details
        const cartItems = user.cartItems?.items?.map(cartItem => ({
            productId: cartItem.product._id,
            productName: cartItem.product.name,
            productDescription: cartItem.product.description,
            productPrice: cartItem.product.price,
            productImages: cartItem.product.images,
            quantity: cartItem.quantiy,
            // Add other product details as needed
        }));
        res.status(200).json({ _id: user._id, userName: user.userName, email: user.email, cart: cartItems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};