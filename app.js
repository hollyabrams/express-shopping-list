const express = require("express");
const app = express();
const router = require("./routes/items");
const ExpressError = require('./expressError')

const itemRoutes = require("./routes/items");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/items", itemRoutes);

router.get("/");

module.exports = app;