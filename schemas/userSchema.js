const pool = require('../config/db');

const createUserTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS Users (
            user_id SERIAL PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            phone_number VARCHAR(20),
            address TEXT
        )
    `;
    await pool.query(query);
};

module.exports = createUserTable;
