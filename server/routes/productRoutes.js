const express = require('express');
const { getProduct, getAllProducts, getActiveProducts, getInactiveProducts, archiveProduct, addQualityCheck } = require('../controllers/productController');

const router = express.Router();

//get routes
router.get('/:id', getProduct);
router.get('/all', getAllProducts);
router.get('/active', getActiveProducts);
router.get('/inactive', getInactiveProducts);
//put routes
router.put('/:id/archive', archiveProduct);
//post routes
router.post('/quality-check', addQualityCheck);



//test db route
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

