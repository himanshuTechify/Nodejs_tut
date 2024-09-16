const Joi = require("joi");

const userSchema = Joi.object({
  first_name: Joi.string().max(50).required(),
  last_name: Joi.string().max(50).optional().allow(null),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().length(10).optional().allow(null),
  address: Joi.string().optional().allow(null),
  role: Joi.string().valid("admin", "user").optional().default("user"),
  isActive : Joi.string().default("true")
});

module.exports = {userSchema}