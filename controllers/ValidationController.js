const Joi = require("joi");
const Role = require("../config/role");
const Admin = require("../models/admin");
const Organizer = require("../models/organizer");
const validateEmail = async (email, role) => {
  if (role === Role.superAdmin || role === Role.staff) {
    let user = await Admin.findOne({ email });
    return user ? false : true;
  }
  user = await Organizer.findOne({ email });
  return user ? false : true;
};

const commonFields = {
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  phone: Joi.string().allow("").optional(),
  isVerify: Joi.boolean().default(false),
};

const adminSchema = Joi.object({
  ...commonFields,
  role: Joi.string().valid(Role.superAdmin, Role.staff).default("staff"),
  isActive: Joi.boolean(),
});

const organizerSchema = Joi.object({
  ...commonFields,
  companyName: Joi.string().optional(),
  contact: Joi.string(),
  accountLevel: Joi.number(),
  bio: Joi.string(),
  accountStatus: Joi.string().default("inactive"),
  payment: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      phone: Joi.string().required(),
      organizer: Joi.number(),
    })
  ),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  adminSchema,
  organizerSchema,
  loginSchema,
  validateEmail,
};
