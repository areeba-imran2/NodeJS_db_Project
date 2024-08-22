const categorySchema = require('../schemas/categorySchema');

// Controller to get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await categorySchema.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to create a new category
const createCategory = async (req, res) => {
    const category = req.body;
    try {
        const newCategory = await categorySchema.createCategory(category);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to update an existing category
const updateCategory = async (req, res) => {
    const id = parseInt(req.params.id);
    const category = req.body;
    try {
        const updatedCategory = await categorySchema.updateCategory(id, category);
        if (updatedCategory) {
            res.status(200).json(updatedCategory);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to delete a category
const deleteCategory = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const deletedCategory = await categorySchema.deleteCategory(id);
        if (deletedCategory) {
            res.status(200).json(deletedCategory);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};
