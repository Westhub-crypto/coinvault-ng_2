// backend/models/FraudLog.js
const { pool } = require('./User');

// Add a fraud log entry
const addFraudLog = async (userId, ip, device, riskScore) => {
  const res = await pool.query(
    'INSERT INTO fraud_logs (user_id, ip, device, risk_score) VALUES ($1,$2,$3,$4) RETURNING *',
    [userId, ip, device, riskScore]
  );
  return res.rows[0];
};

// Get all fraud logs for a user
const getFraudLogs = async (userId) => {
  const res = await pool.query(
    'SELECT * FROM fraud_logs WHERE user_id=$1 ORDER BY flagged_at DESC',
    [userId]
  );
  return res.rows;
};

module.exports = {
  addFraudLog,
  getFraudLogs,
};