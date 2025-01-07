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
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Error fetching active product' });
    }
};

//
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching all products:', error);
        res.status(500).json({ error: 'Error fetching all products' });
    }
};

//
const getActiveProducts = async (req, res) => {
    try {
        const activeProducts = await Product.find({ isActive: true });
        res.status(200).json(activeProducts);
    } catch (error) {
        console.error('Error fetching active products:', error);
        res.status(500).json({ error: 'Error fetching active products' });
    }
};

//
const getInactiveProducts = async (req, res) => {
    try {
        const inactiveProducts = await Product.find({ isActive: false });
        res.status(200).json(inactiveProducts);
    } catch (error) {
        console.error('Error fetching inactive products:', error);
        res.status(200).json({ error: 'Error fetching inactive products' });
    }
};

//
const archiveProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product archived successfully', product});
    } catch (error) {
        console.error("Error archiving product:", error);
        res.status(500).json({ error: 'Internal Server Error '});
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
        console.error('Error adding quality check:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

module.exports = { getProduct, archiveProduct, getAllProducts, getActiveProducts, getInactiveProducts, addQualityCheck };