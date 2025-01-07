const express = require('express');
const { getProduct, addQualityCheck } = require('../controllers/productController');

const router = express.Router();

router.get('/:id', getProduct);
router.post('/quality-check', addQualityCheck);

router.get('/test-db', async (req, res) => {
    try {
        const databases = await mongoose.connection.db.admin().listDatabases();
        res.status(200).json(databases);
    } catch (error) {
        console.error('Error listing databases:', error);
        res.status(500).json({ error: 'Could not connect to database' });
    }
});

module.exports = router;

