const express = require("express");
const userRoutes = require("./routes/userRoutes");
const customerRoutes = require("./routes/customerRoutes");

const app = express();

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/customer", customerRoutes);
module.exports = app;