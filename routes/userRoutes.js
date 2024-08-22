const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to get all users
router.get('/', userController.getUsers);

// Route to get a user by ID
router.get('/:id', userController.getUser);

// Route to create a new user
router.post('/', userController.createUser);

// Route to update an existing user
router.put('/:id', userController.updateUser);

module.exports = router;
