const express = require('express');
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Product = require('../models/Product');
const router = express.Router();

// Create new order
router.post('/', auth, async (req, res) => {
    try {
        const { products } = req.body;
        
        // Calculate total price and verify products
        let totalPrice = 0;
        const orderProducts = [];
        
        for (const item of products) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ message: `Product ${item.product} not found` });
            }
            
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
            }
            
            totalPrice += product.price * item.quantity;
            orderProducts.push({
                product: item.product,
                quantity: item.quantity
            });

            // Update product stock
            product.stock -= item.quantity;
            await product.save();
        }

        // Create order
        const order = new Order({
            user: req.user.id,
            products: orderProducts,
            totalPrice,
            status: 'pending'
        });

        await order.save();
        res.status(201).json(order);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;