const userSchema = require('../schemas/userSchema');

// Controller to get all users
const getUsers = async (req, res) => {
    try {
        const users = await userSchema.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to get a user by ID
const getUser = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const user = await userSchema.getUserById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to create a new user
const createUser = async (req, res) => {
    const user = req.body;
    try {
        const newUser = await userSchema.createUser(user);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to update an existing user
const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const user = req.body;
    try {
        const updatedUser = await userSchema.updateUser(id, user);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
};
