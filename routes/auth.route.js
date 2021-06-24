const express = require("express");
const router = express.Router();

const authService = require("../services/auth.service");

// auth/register
router.post("/register", async (req, res) => {
  const data = await authService.registration(req.body, res);
  res.send(data);
});

// auth/login
router.post("/login", async (req, res) => {
  const isValid = await authService.login(req.body, res);
  if (!isValid) return res.status(400).send({ msg: "Password doesn't match" });

  res.send("Logged In");
});

module.exports = router;
