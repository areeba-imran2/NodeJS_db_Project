// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to get all products
router.get('/', async (req, res) => {
    try {
        const products = await productController.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});

// Route to get a product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await productController.getProductById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
});

// Route to create a new product
router.post('/', async (req, res) => {
    try {
        const newProduct = await productController.createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
});

// Route to update an existing product
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await productController.updateProduct(req.params.id, req.body);
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
});

// Route to delete a product
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await productController.deleteProduct(req.params.id);
        if (deletedProduct) {
            res.json(deletedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
});

module.exports = router;
