const mongoose = require('mongoose');

const QualityCheckSchema = new mongoose.Schema({
    status: String,
    date: Date,
});

const ProductSchema = new mongoose.Schema({
    name: String,
    qualityChecks: [QualityCheckSchema],
    isActive: { type: Boolean, default: true },
}, { collection: 'block-QA' }); 

module.exports = mongoose.model('Product', ProductSchema);