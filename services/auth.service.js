const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const mongo = require("../shared/mongo");
const { registerValidation, loginValidation } = require("../shared/validation");

const findByEmail = (email) => {
  return mongo.db.collection("users").findOne({ email });
};

const registration = async (input, res) => {
  // Input Validation
  const { error } = await registerValidation(input);
  if (error) return res.status(400).send({ msg: error.details[0].message });

  // Email Exists Validation
  const user = await findByEmail(input.email);
  if (user) return res.status(400).send({ msg: "Email already exists" });

  // Encrypt the Password
  const salt = await bcrypt.genSalt(10);
  input.password = await bcrypt.hash(input.password, salt);

  // Insert User to DB
  return mongo.db.collection("users").insertOne(input);
};

const login = async (input, res) => {
  // Input Validation
  const { error } = await loginValidation(input);
  if (error) return res.status(400).send({ msg: error.details[0].message });

  // Email Exists Validation
  const user = await findByEmail(input.email);
  if (!user) return res.status(400).send({ msg: "Email doesn't exists" });

  // Check Password
  const isValid = bcrypt.compare(input.password, user.password);
  if (!isValid) return res.status(400).send({ msg: "Password doesn't match" });

  // Generate Access Token
  return jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "8h",
  });
};

const validateToken = async (req, res, next) => {
  const token = req.headers["access-token"];

  // Check token exists or not
  if (!token) return res.status(401).send("Access Denied");

  // Check valid token or not
  try {
    const user = await jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = {
  registration,
  login,
  validateToken,
};
