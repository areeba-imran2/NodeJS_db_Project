const productSchema = require('../schemas/productSchema');

// Controller to get all products
const getProducts = async (req, res) => {
    try {
        const products = await productSchema.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to get a product by ID
const getProduct = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const product = await productSchema.getProductById(id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to create a new product
const createProduct = async (req, res) => {
    const product = req.body;
    try {
        const newProduct = await productSchema.createProduct(product);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to update an existing product
const updateProduct = async (req, res) => {
    const id = parseInt(req.params.id);
    const product = req.body;
    try {
        const updatedProduct = await productSchema.updateProduct(id, product);
        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to delete a product
const deleteProduct = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const deletedProduct = await productSchema.deleteProduct(id);
        if (deletedProduct) {
            res.status(200).json(deletedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
