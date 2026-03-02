// ==============================
// CoinVault NG - Backend Server
// ==============================

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

// ==============================
// Middleware
// ==============================

app.use(cors());
app.use(express.json());

// ==============================
// PostgreSQL Connection
// ==============================

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ Database connection error:", err));

// Make DB accessible in routes
app.use((req, res, next) => {
  req.db = pool;
  next();
});

// ==============================
// Routes
// ==============================

const tapRoutes = require("./routes/tap");
const referralRoutes = require("./routes/referral");
const withdrawRoutes = require("./routes/withdraw");
const userRoutes = require("./routes/user");

app.use("/api/tap", tapRoutes);
app.use("/api/referral", referralRoutes);
app.use("/api/withdraw", withdrawRoutes);
app.use("/api/user", userRoutes);

// ==============================
// Health Check
// ==============================

app.get("/", (req, res) => {
  res.json({
    status: "CoinVault NG Backend Running 🚀",
  });
});

// ==============================
// Start Server
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
