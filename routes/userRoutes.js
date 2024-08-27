const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 
const verifyToken = require('../middleware/authMiddleware');

// Route to get all users (Admin only)
router.get('/', verifyToken, async (req, res) => {
    try {
        const users = await userController.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

// Route to get a user by ID
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const user = await userController.getUserById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({ message: 'User not found', error: error.message });
    }
});

// Route to create a new user (Only Admin can create users through API)
router.post('/add', verifyToken, async (req, res) => {
    try {
        const newUser = await userController.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

// Route to update an existing user
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const updatedUser = await userController.updateUser(req.params.id, req.body);
        res.json(updatedUser);
    } catch (error) {
        res.status(404).json({ message: 'User not found', error: error.message });
    }
});

// Route to delete a user
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const deletedUser = await userController.deleteUser(req.params.id);
        res.json(deletedUser);
    } catch (error) {
        res.status(404).json({ message: 'User not found', error: error.message });
    }
});

module.exports = router;
