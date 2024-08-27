const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const client = require('../db/db'); 
const { hashPassword, comparePassword } = require('../utils/hashing');
require('dotenv').config();

// Register new user
router.post('/signup', async (req, res) => {
    const { first_name, last_name, email, phone_number, address, password } = req.body;

    try {
        // First Check if any users exist in the database if not then it will give admin rights to 1st user

        const usersExistQuery = 'SELECT COUNT(*) FROM Users';
        const usersExistResult = await client.query(usersExistQuery);
        const userCount = parseInt(usersExistResult.rows[0].count, 10);

        // Determine role based on user count

        const role = userCount === 0 ? 'admin' : 'user';

        // Hash the password

        const hashedPassword = await hashPassword(password);

        // Insert new user
        const query = `
            INSERT INTO Users (first_name, last_name, email, phone_number, address, password, role)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const result = await client.query(query, [first_name, last_name, email, phone_number, address, hashedPassword, role]);

        // Respond with created user
        res.status(201).json(result.rows[0]);
    }    catch (error) {
        // Handle errors
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Query to find the user by email
        const query = 'SELECT * FROM Users WHERE email = $1';
        const result = await client.query(query, [email]);

        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const user = result.rows[0];

        // Compare provided password with hashed password
        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { user_id: user.user_id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION } // Ensure this is a valid time format
        );

        // Respond with token
        res.json({ token });
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

module.exports = router;
