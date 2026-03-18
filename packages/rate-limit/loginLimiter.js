const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 3,
  message: {
    message: "Too many login attempts. Try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = loginLimiter;