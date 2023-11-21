const { register, verification } = require("../services/registerServices");
const Role = require("../config/role");
const signupForStaff = async (req, res) => {
  await register(req.body, Role.staff, res);
};
const signupForOrganizer = async (req, res) => {
  await register(req.body, Role.organzier, res);
};
const signupForVerification = async (req, res) => {
  await verification(req, res);
};
module.exports = {
  signupForStaff,
  signupForVerification,
  signupForOrganizer,
};
