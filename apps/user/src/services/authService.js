const db = require("@repo/db");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");


//register
exports.registerUser = async (name, email, password) => {
  // 1. Check if user exists
  const existingUser = await db.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (existingUser.rows.length > 0) {
    throw new Error("User already exists");
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Insert user
  const result = await db.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, hashedPassword]
  );

  const user = result.rows[0];

  // 4. Generate token
  //const token = generateToken(user);

  return user;
};

exports.loginUser = async (email, password) => {
  const result = await db.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  const user = result.rows[0];

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user);

  return token;
};