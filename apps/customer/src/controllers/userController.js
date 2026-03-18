const { userService, customerService } = require("../services/userService");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};