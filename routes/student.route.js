const express = require("express");
const { ObjectId } = require("mongodb");

const mongo = require("../shared/mongo");
const { validateToken } = require("../services/auth.service");

const router = express.Router();

// CRUD - READ - GET - /students/
router.get("/", async (req, res) => {
  const data = await mongo.db.collection("users").find().toArray();
  res.send(data);
});

// CRUD - READ - GET - /students/13121
router.get("/:id", async (req, res) => {
  const data = await mongo.db
    .collection("users")
    .findOne({ _id: ObjectId(req.params.id) });
  res.send(data);
});

// CRUD - CREATE - POST - /students/
router.post("/", async (req, res) => {
  const data = await mongo.db.collection("users").insertOne(req.body);
  res.send(data);
});

// CRUD - UPDATE - PUT - /students/1234
router.put("/:id", async (req, res) => {
  const data = await mongo.db
    .collection("users")
    .findOneAndUpdate({ _id: ObjectId(req.params.id) }, { $set: req.body });
  res.send(data);
});

// CRUD - DELETE - DELETE - /students/
router.delete("/:id", async (req, res) => {
  const data = await mongo.db
    .collection("users")
    .remove({ _id: ObjectId(req.params.id) });
  res.send(data);
});

module.exports = router;
