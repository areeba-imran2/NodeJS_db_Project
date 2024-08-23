const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route to get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await orderController.getAllOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
});

// Route to get an order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await orderController.getOrderById(req.params.id);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error });
    }
});

// Route to create a new order
router.post('/', async (req, res) => {
    try {
        const newOrder = await orderController.createOrder(req.body);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
});

// Route to update an existing order
router.put('/:id', async (req, res) => {
    try {
        const updatedOrder = await orderController.updateOrder(req.params.id, req.body);
        if (updatedOrder) {
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error });
    }
});

// Route to delete an order
router.delete('/:id', async (req, res) => {
    try {
        const deletedOrder = await orderController.deleteOrder(req.params.id);
        if (deletedOrder) {
            res.json(deletedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error });
    }
});

module.exports = router;
