const express = require("express");
const authRoutes = require("./routes/authRoutes");
const authController = require("./controllers/authController");

const app = express();

app.use(express.json());

// Register these first so POST always matches (avoids 404 from wrong method / router quirks)
app.post("/api/auth/register", authController.register);
app.post("/api/auth/login", authController.login);

app.use("/api/auth", authRoutes);

/** Helpful if you open /api/auth in browser */
app.get("/api/auth", (req, res) => {
  res.json({
    service: "user-auth",
    usePost: [
      "POST /api/auth/register — body: { \"name\", \"email\", \"password\" }",
      "POST /api/auth/login — body: { \"email\", \"password\" }",
    ],
  });
});

module.exports = app;
