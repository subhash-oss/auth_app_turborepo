const db = require("@repo/db");

exports.getUserById = async (userId) => {
  const result = await db.query(
    "SELECT id, name, email FROM users WHERE id = $1",
    [userId]
  );

  return result.rows[0];
};