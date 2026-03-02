// backend/models/User.js
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DB_URL });

// Get user by ID
const getUserById = async (id) => {
  const res = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
  return res.rows[0];
};

// Create new user
const createUser = async (username) => {
  const res = await pool.query(
    'INSERT INTO users (username) VALUES ($1) RETURNING *',
    [username]
  );
  return res.rows[0];
};

// Update user balance
const updateBalance = async (userId, amount) => {
  await pool.query(
    'UPDATE users SET balance = balance + $1 WHERE id=$2',
    [amount, userId]
  );
};

module.exports = {
  pool,
  getUserById,
  createUser,
  updateBalance,
};