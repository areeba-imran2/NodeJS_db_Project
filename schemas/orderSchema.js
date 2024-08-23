const pool = require('../db/db');

const createOrderTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS Orders (
            order_id SERIAL PRIMARY KEY,
            order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            total_amount NUMERIC(10, 2) NOT NULL,
            user_id INTEGER REFERENCES Users(user_id) ON DELETE CASCADE
        )
    `;
    await pool.query(query);
};

module.exports = createOrderTable;
