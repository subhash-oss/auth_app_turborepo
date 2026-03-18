const db = require("@repo/db");

exports.getCustomerDetails = async (userId) => {
  const result = await db.query(
    `SELECT 
      c.id,
      c.job,
      c.salary,
      c.department,
      u.name,
      u.email
     FROM customer_details c
     JOIN users u ON c.user_id = u.id
     WHERE c.user_id = $1`,
    [userId]
  );

  return result.rows;
};

//update user name

exports.updateUserName = async (userId, name) => {
  const result = await db.query(
    `UPDATE users
     SET name = $1
     WHERE id = $2
     RETURNING id, name, email`,
    [name, userId]
  );

  return result.rows[0];
};