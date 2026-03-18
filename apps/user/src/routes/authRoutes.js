const express = require("express");
const router = express.Router();
const loginLimiter = require("@repo/rate-limit");
const { login, register } = require("../controllers/authController");

router.get("/login", (req, res) => {
  res.status(405).set("Allow", "POST").json({
    message: "Use POST with JSON body: { \"email\": \"...\", \"password\": \"...\" }",
    example: "POST /api/auth/login",
  });
});

router.post("/login", loginLimiter, login);
router.post("/register", register);

module.exports = router;