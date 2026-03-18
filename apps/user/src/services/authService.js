const db = require("@repo/db");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

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