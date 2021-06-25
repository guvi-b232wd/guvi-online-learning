const express = require("express");
const { ObjectId } = require("mongodb");

const mongo = require("../shared/mongo");

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await mongo.db
    .collection("users")
    .findOne({ _id: ObjectId(req.user.id) });
  res.send(data);
});

module.exports = router;
