const bcrypt = require('bcrypt');
const saltRounds = 10; // Adjust salt rounds if needed

// Function to hash a password
const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error(`Error hashing password: ${error.message}`);
    }
};

// Function to compare a password with a hashed password
const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        throw new Error(`Error comparing password: ${error.message}`);
    }
};

module.exports = {
    hashPassword,
    comparePassword,
};
