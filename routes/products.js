const express = require('express');
const Product = require('../models/Product'); // Import the Product model
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Add a new product
router.post('/', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        stock: req.body.stock,
    });
    
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct); 
} catch (error) {
    res.status(400).json({ message: error.message });
}
});

module.exports = router;