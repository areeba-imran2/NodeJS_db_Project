const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route to get all orders
router.get('/', orderController.getOrders);

// Route to get an order by ID
router.get('/:id', orderController.getOrder);

// Route to update an existing order
router.put('/:id', orderController.updateOrder);

// Route to delete an order
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
