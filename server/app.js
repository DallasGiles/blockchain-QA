const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());

//routes
app.use('/api/products', productRoutes);
// app.use('/api/auth', authRoutes);

module.exports = app;

