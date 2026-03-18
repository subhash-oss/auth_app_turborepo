const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { getCustomerData } = require("../controllers/customerController");

router.get("/details", authMiddleware, getCustomerData);

module.exports = router;