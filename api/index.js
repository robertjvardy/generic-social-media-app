const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const logger = require("./Middleware/logger");

dotenv.config();

// Import Routes
const authRoute = require("./Routes/auth");

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  console.log("Connected to DB.")
);

// Middleware
app.use(cors());
app.use(logger); // TODO output to a log file
app.use(express.json());

// Route Middleware
app.use("/api/user", authRoute);

const PORT = process.env.PORT || process.env.DEFAULT_PORT;

app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));
