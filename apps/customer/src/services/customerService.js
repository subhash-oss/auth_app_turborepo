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