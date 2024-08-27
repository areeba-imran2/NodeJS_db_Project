const { Client } = require('pg');
const client = new Client({
    connectionString: process.env.DATABASE_URL
});

client.connect();

// Function to get all users
const getAllUsers = async () => {
    try {
        const query = 'SELECT * FROM Users';
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        throw new Error(`Error fetching all users: ${error.message}`);
    }
};

// Function to get a user by ID
const getUserById = async (id) => {
    try {
        const query = 'SELECT * FROM Users WHERE user_id = $1';
        const result = await client.query(query, [id]);
        if (result.rows.length === 0) {
            throw new Error('User not found');
        }
        return result.rows[0];
    } catch (error) {
        throw new Error(`Error fetching user by ID: ${error.message}`);
    }
};

// Function to create a new user
const createUser = async (user) => {
    const { first_name, last_name, email, phone_number, address, password } = user;
    try {
        const query = `
            INSERT INTO Users (first_name, last_name, email, phone_number, address, password)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const result = await client.query(query, [first_name, last_name, email, phone_number, address, password]);
        return result.rows[0];
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
};

// Function to update an existing user
const updateUser = async (id, user) => {
    const { first_name, last_name, email, phone_number, address } = user;
    try {
        const query = `
            UPDATE Users
            SET first_name = $1, last_name = $2, email = $3, phone_number = $4, address = $5
            WHERE user_id = $6 RETURNING *`;
        const result = await client.query(query, [first_name, last_name, email, phone_number, address, id]);
        if (result.rows.length === 0) {
            throw new Error('User not found');
        }
        return result.rows[0];
    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
};

// Function to delete a user
const deleteUser = async (id) => {
    try {
        const query = 'DELETE FROM Users WHERE user_id = $1 RETURNING *';
        const result = await client.query(query, [id]);
        if (result.rows.length === 0) {
            throw new Error('User not found');
        }
        return result.rows[0];
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
