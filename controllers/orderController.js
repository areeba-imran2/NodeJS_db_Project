const pool = require('../db/db');

// Function to get all orders
const getAllOrders = async () => {
    try {
        const query = 'SELECT * FROM Orders';
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching all orders:', error);
        throw error;
    }
};

// Function to get an order by ID
const getOrderById = async (id) => {
    try {
        const query = 'SELECT * FROM Orders WHERE order_id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.error(`Error fetching order with ID ${id}:`, error);
        throw error;
    }
};

// Function to create a new order
const createOrder = async (order) => {
    try {
        const { total_amount, user_id } = order;
        const query = `
            INSERT INTO Orders (total_amount, user_id)
            VALUES ($1, $2) RETURNING *`;
        const result = await pool.query(query, [total_amount, user_id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error creating new order:', error);
        throw error;
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
};
