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
  const token = await authService.login(req.body, res);
  res.send(token);
});

module.exports = router;
