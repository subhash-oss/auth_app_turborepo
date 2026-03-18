const authService = require("../services/authService");

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