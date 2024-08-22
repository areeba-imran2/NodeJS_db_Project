const pool = require('../config/db');

// Function to get all orders
const getAllOrders = async () => {
    const query = 'SELECT * FROM Orders';
    const result = await pool.query(query);
    return result.rows;
};

// Function to get an order by ID
const getOrderById = async (id) => {
    const query = 'SELECT * FROM Orders WHERE order_id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
};


// Function to update an existing order
const updateOrder = async (id, order) => {
    const { order_date, total_amount, user_id } = order;
    const query = `
        UPDATE Orders
        SET order_date = $1, total_amount = $2, user_id = $3, updated_at = CURRENT_TIMESTAMP
        WHERE order_id = $4 RETURNING *`;
    const result = await pool.query(query, [order_date, total_amount, user_id, id]);
    return result.rows[0];
};

// Function to delete an order
const deleteOrder = async (id) => {
    const query = 'DELETE FROM Orders WHERE order_id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
};

module.exports = {
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
};
