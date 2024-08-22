const pool = require('../config/db');

// Function to get all users
const getAllUsers = async () => {
    const query = 'SELECT * FROM Users';
    const result = await pool.query(query);
    return result.rows;
};

// Function to get a user by ID
const getUserById = async (id) => {
    const query = 'SELECT * FROM Users WHERE user_id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
};

// Function to create a new user
const createUser = async (user) => {
    const { first_name, last_name, email, phone_number, address } = user;
    const query = `
        INSERT INTO Users (first_name, last_name, email, phone_number, address)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const result = await pool.query(query, [first_name, last_name, email, phone_number, address]);
    return result.rows[0];
};

// Function to update an existing user
const updateUser = async (id, user) => {
    const { first_name, last_name, email, phone_number, address } = user;
    const query = `
        UPDATE Users
        SET first_name = $1, last_name = $2, email = $3, phone_number = $4, address = $5, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $6 RETURNING *`;
    const result = await pool.query(query, [first_name, last_name, email, phone_number, address, id]);
    return result.rows[0];
};


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
};
