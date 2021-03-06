const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(8).max(12).required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(8).max(12).required(),
  });

  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
};
