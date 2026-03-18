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