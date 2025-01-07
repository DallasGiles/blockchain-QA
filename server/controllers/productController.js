const mongoose = require('mongoose');
const Product = require('../models/Product');

const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        // Ensure the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid product ID format' });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error); // Log the actual error
        res.status(500).json({ error: 'Error fetching product' });
    }
};

const addQualityCheck = async (req, res) => {
    const { productId, qualityStatus } = req.body;

    // Validate request data
    if (!productId || !qualityStatus) {
        return res.status(400).json({ error: 'productId and qualityStatus are required' });
    }

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        product.qualityChecks.push({ status: qualityStatus, date: new Date() });
        await product.save();
        res.status(200).json({ message: 'Quality check added' });
    } catch (error) {
        console.error('Error adding quality check:', error); // Log full error
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

module.exports = { getProduct, addQualityCheck };