const { register, verification } = require("../services/registerServices");
const { login } = require("../services/loginService");
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
const loginForOrganzier = async (req, res) => {
  await login(req.body, Role.organzier, res);
};
const loginForAdmin = async (req, res) => {
  await login(req.body, Role.staff, res);
};
module.exports = {
  loginForAdmin,
  loginForOrganzier,
  signupForStaff,
  signupForVerification,
  signupForOrganizer,
};
