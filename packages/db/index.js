const path = require("path");
const { Pool } = require("pg");

// Load .env from monorepo root (two levels up from packages/db)
require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432", 10),
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
