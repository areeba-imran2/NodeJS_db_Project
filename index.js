const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config(); 

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

// Middleware imports
const logger = require('./middleware/logger');
const notFound = require('./middleware/notFound');
const authMiddleware = require('./middleware/authMiddleware'); // Assuming you have this

// Middleware setup
app.use(logger); 
app.use(express.json());

// Route handlers
app.use('/auth', authRoutes); // Authentication routes
// User routes with authentication middleware
app.use('/users', authMiddleware, userRoutes); 
// Order routes with authentication middleware
app.use('/orders', authMiddleware, orderRoutes); 
 // Category routes with authentication middleware
app.use('/categories', authMiddleware, categoryRoutes);
// Product routes with authentication middleware
app.use('/products', authMiddleware, productRoutes); 

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Middleware for handling 404 errors
app.use(notFound); // Middleware to handle 404 errors

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log error details
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
