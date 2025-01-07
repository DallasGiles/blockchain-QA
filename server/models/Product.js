const mongoose = require('mongoose');

const QualityCheckSchema = new mongoose.Schema({
    status: String,
    date: Date,
});

const ProductSchema = new mongoose.Schema({
    name: String,
    qualityChecks: [QualityCheckSchema],
}, { collection: 'block-QA' }); // Specify the collection name explicitly

module.exports = mongoose.model('Product', ProductSchema);