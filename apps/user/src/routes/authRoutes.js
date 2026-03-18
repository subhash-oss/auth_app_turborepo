const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");

router.get("/login", (req, res) => {
  res.status(405).set("Allow", "POST").json({
    message: "Use POST with JSON body: { \"email\": \"...\", \"password\": \"...\" }",
    example: "POST /api/auth/login",
  });
});

router.post("/login", login);

module.exports = router;