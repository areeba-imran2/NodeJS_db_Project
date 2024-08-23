// index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Import routes
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

// Middleware for logging
const logger = require('./middleware/logger');

// Middleware for handling 404 errors
const notFound = require('./middleware/notFound');

// Middleware setup
app.use(logger);
app.use(express.json());

// Route handlers
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Middleware for handling 404 errors
app.use(notFound);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
