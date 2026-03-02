// backend/models/TapCoin.js
const { pool } = require('./User');

// Add tap coins (locked until unlock date)
const addTapCoins = async (userId, coins, unlockAt) => {
  const res = await pool.query(
    'INSERT INTO tap_coins (user_id, coins_earned, unlock_at) VALUES ($1, $2, $3) RETURNING *',
    [userId, coins, unlockAt]
  );
  return res.rows[0];
};

// Get unlocked coins for user
const getUnlockedCoins = async (userId) => {
  const res = await pool.query(
    'SELECT * FROM tap_coins WHERE user_id=$1 AND unlock_at <= NOW() AND is_withdrawn=false',
    [userId]
  );
  return res.rows;
};

// Mark coins as withdrawn
const markWithdrawn = async (tapCoinId) => {
  await pool.query('UPDATE tap_coins SET is_withdrawn=true WHERE id=$1', [tapCoinId]);
};

module.exports = {
  addTapCoins,
  getUnlockedCoins,
  markWithdrawn,
};