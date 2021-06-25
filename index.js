const cors = require("cors");
const express = require("express");
const app = express();

require("dotenv").config();

// Mongo Connection
const mongo = require("./shared/mongo");

// Routes
const authRoute = require("./routes/auth.route");
const profileRoute = require("./routes/profile.route");
const studentRoute = require("./routes/student.route");

// Service
const { validateToken } = require("./services/auth.service");

async function loadApp() {
  try {
    await mongo.connect();

    app.use(cors());

    // Parse your request body into a json format
    app.use(express.json());

    // All Routes
    app.use("/auth", authRoute);

    // app.use(validateToken)
    app.use("/profile", validateToken, profileRoute);
    app.use("/students", validateToken, studentRoute);

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server Up and Running at ${port}...`));
  } catch (err) {
    console.log(err);
    console.log("Error Creating Server...");
    process.exit();
  }
}

loadApp();
