const pool = require('../db/db');

// Function to get all products
const getAllProducts = async () => {
    const query = 'SELECT * FROM Products';
    const result = await pool.query(query);
    return result.rows;
};

// Function to get a product by ID
const getProductById = async (id) => {
    const query = 'SELECT * FROM Products WHERE product_id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
};

// Function to create a new product
const createProduct = async (product) => {
    const { product_name, product_price, product_quantity, description } = product;
    const query = `
        INSERT INTO Products (product_name, product_price, product_quantity, description)
        VALUES ($1, $2, $3, $4) RETURNING *`;
    const result = await pool.query(query, [product_name, product_price, product_quantity, description]);
    return result.rows[0];
};

// Function to update an existing product
const updateProduct = async (id, product) => {
    const { product_name, product_price, product_quantity, description } = product;
    const query = `
        UPDATE Products
        SET product_name = $1, product_price = $2, product_quantity = $3, description = $4, updated_at = CURRENT_TIMESTAMP
        WHERE product_id = $5 RETURNING *`;
    const result = await pool.query(query, [product_name, product_price, product_quantity, description, id]);
    return result.rows[0];
};

// Function to delete a product
const deleteProduct = async (id) => {
    const query = 'DELETE FROM Products WHERE product_id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
