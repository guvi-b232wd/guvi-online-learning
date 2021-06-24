const bcrypt = require("bcrypt");

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
  return bcrypt.compare(input.password, user.password);
};

module.exports = {
  registration,
  login,
};
