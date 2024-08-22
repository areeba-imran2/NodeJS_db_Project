const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to get all products
router.get('/', productController.getProducts);

// Route to get a product by ID
router.get('/:id', productController.getProduct);

// Route to create a new product
router.post('/', productController.createProduct);

// Route to update an existing product
router.put('/:id', productController.updateProduct);

// Route to delete a product
router.delete('/:id', productController.deleteProduct);

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/productController');

// // Define routes for products
// router.get('/', productController.getProducts);
// router.get('/:id', productController.getProduct);
// router.post('/', productController.createProduct);
// router.put('/:id', productController.updateProduct);
// router.delete('/:id', productController.deleteProduct);

// module.exports = router;
