const customerService = require("../services/customerService");

exports.getCustomerData = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await customerService.getCustomerDetails(userId);

    res.json({
      message: "Customer data fetched",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//update customer name
exports.updateName = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const updatedUser = await customerService.updateUserName(userId, name);

    res.json({
      message: "Name updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};