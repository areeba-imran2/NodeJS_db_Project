// controllers/categoryController.js
const pool = require('../db/db');

// Function to get all categories
const getAllCategories = async () => {
    const query = 'SELECT * FROM Categories';
    const result = await pool.query(query);
    return result.rows;
};

// Function to get a category by ID
const getCategoryById = async (id) => {
    const query = 'SELECT * FROM Categories WHERE category_id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
};

// Function to create a new category
const createCategory = async (category) => {
    const { category_name, description } = category;
    const query = `
        INSERT INTO Categories (category_name, description)
        VALUES ($1, $2) RETURNING *`;
    const result = await pool.query(query, [category_name, description]);
    return result.rows[0];
};

// Function to update an existing category
const updateCategory = async (id, category) => {
    const { category_name, description } = category;
    const query = `
        UPDATE Categories
        SET category_name = $1, description = $2
        WHERE category_id = $3 RETURNING *`;
    const result = await pool.query(query, [category_name, description, id]);
    return result.rows[0];
};

// Function to delete a category
const deleteCategory = async (id) => {
    const query = 'DELETE FROM Categories WHERE category_id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
