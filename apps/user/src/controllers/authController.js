const authService = require("../services/authService");

//register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const token = await authService.registerUser(name, email, password);

    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await authService.loginUser(email, password);

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};