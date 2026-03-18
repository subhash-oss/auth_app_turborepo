const jwt = require("jsonwebtoken");

module.exports = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    "your_secret_key",
    { expiresIn: "1d" }
  );
};