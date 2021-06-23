const cors = require("cors");
const express = require("express");
const app = express();

require("dotenv").config();

// Mongo Connection
const mongo = require("./shared/mongo");

// Routes
const studentRoute = require("./routes/student");

async function loadApp() {
  try {
    await mongo.connect();

    app.use(cors());

    // Parse your request body into a json format
    app.use(express.json());

    // All Routes
    app.use("/students", studentRoute);

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server Up and Running at ${port}...`));
  } catch (err) {
    console.log(err);
    console.log("Error Creating Server...");
    process.exit();
  }
}

loadApp();
