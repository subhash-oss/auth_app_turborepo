const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { getCustomerData, updateName } = require("../controllers/customerController");

router.get("/details", authMiddleware, getCustomerData);
router.put("/update-name", authMiddleware, updateName);

module.exports = router;