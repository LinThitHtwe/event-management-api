const { register, verification } = require("../services/registerServices");
require("dotenv").config();
const { login } = require("../services/loginService");
const Role = require("../config/role");
const jwt = require("jsonwebtoken");
const { verifyRefresh } = require("../helper");
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
const generateToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const { email } = req.body;
  const { isValid, role } = verifyRefresh("minbhonethantes@gmail.com", refreshToken);

  if (!refreshToken) res.status(403).send("Invalid refresh token");
  if (!isValid || role === null) {
    return res.status(401).json({ success: false, error: "Invalid Token" });
  }

  const accessToken = jwt.sign(
    {
      UserInfo: {
        email: email,
        role: role,
      },
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "5m",
    }
  );
  res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: "None", secure: true });

  res.json({ success: true, message: "Successfully access token created", expiresIn: "5m" });
};
module.exports = {
  loginForAdmin,
  generateToken,
  loginForOrganzier,
  signupForStaff,
  signupForVerification,
  signupForOrganizer,
};
