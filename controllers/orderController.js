const orderSchema = require('../schemas/orderSchema');

// Controller to get all orders
const getOrders = async (req, res) => {
    try {
        const orders = await orderSchema.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to get an order by ID
const getOrder = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const order = await orderSchema.getOrderById(id);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to update an existing order
const updateOrder = async (req, res) => {
    const id = parseInt(req.params.id);
    const order = req.body;
    try {
        const updatedOrder = await orderSchema.updateOrder(id, order);
        if (updatedOrder) {
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to delete an order
const deleteOrder = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const deletedOrder = await orderSchema.deleteOrder(id);
        if (deletedOrder) {
            res.status(200).json(deletedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getOrders,
    getOrder,
    updateOrder,
    deleteOrder,
};
