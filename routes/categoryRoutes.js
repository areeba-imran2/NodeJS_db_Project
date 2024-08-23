const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Route to get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await categoryController.getAllCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
});

// Route to get a category by ID
router.get('/:id', async (req, res) => {
    try {
        const category = await categoryController.getCategoryById(req.params.id);
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category', error });
    }
});

// Route to create a new category
router.post('/', async (req, res) => {
    try {
        const newCategory = await categoryController.createCategory(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
});

// Route to update an existing category
router.put('/:id', async (req, res) => {
    try {
        const updatedCategory = await categoryController.updateCategory(req.params.id, req.body);
        if (updatedCategory) {
            res.json(updatedCategory);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error });
    }
});

// Route to delete a category
router.delete('/:id', async (req, res) => {
    try {
        const deletedCategory = await categoryController.deleteCategory(req.params.id);
        if (deletedCategory) {
            res.json(deletedCategory);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }
});

module.exports = router;
