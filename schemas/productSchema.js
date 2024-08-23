const pool = require('../db/db');

const createProductTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS Products (
            product_id SERIAL PRIMARY KEY,
            product_name VARCHAR(255) NOT NULL,
            product_price NUMERIC(10, 2) NOT NULL,
            product_quantity INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            description TEXT
        )
    `;
    await pool.query(query);
};

module.exports = createProductTable;
