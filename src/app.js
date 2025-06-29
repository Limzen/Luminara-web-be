const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const sequelize = require("./db/sequelize");
const routes = require("./routes");
require("dotenv").config();
const path = require("path");

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // HTTP request logger
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// API Routes
const API_PREFIX = process.env.API_PREFIX || "/api";
app.use(API_PREFIX, routes);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Luminara API" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

console.log("Serving uploads from:", path.join(__dirname, "../uploads"));

const PORT = process.env.PORT || 3000;

// Sync database and start server
sequelize
  .sync({ alter: process.env.NODE_ENV === "development" })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}${API_PREFIX}`);
    });
  })
  .catch((err) => {
    console.error("Unable to sync database:", err);
  });
