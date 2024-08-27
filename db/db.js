// const { Pool } = require('pg');
// require('dotenv').config();

// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// });

// pool.on('connect', () => {
//     console.log('Connected to the database');
// });

// module.exports = pool;


const { Pool } = require('pg');
require('dotenv').config();

// Create a new Pool instance using DATABASE_URL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('Connected to the database');
});

module.exports = pool;
