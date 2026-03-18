const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController");

router.get("/login", (req, res) => {
  res.status(405).set("Allow", "POST").json({
    message: "Use POST with JSON body: { \"email\": \"...\", \"password\": \"...\" }",
    example: "POST /api/auth/login",
  });
});

router.get("/register", (req, res) => {
  res.status(405).set("Allow", "POST").json({
    message: "Use POST with JSON body: { \"name\": \"...\", \"email\": \"...\", \"password\": \"...\" }",
    example: "POST http://localhost:4000/api/auth/register",
  });
});

router.post("/login", login);
router.post("/register", register);

module.exports = router;