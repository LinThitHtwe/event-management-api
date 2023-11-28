const { register, verification, sendEmail } = require("../services/registerServices");
require("dotenv").config();
const { login } = require("../services/loginService");
const Role = require("../config/role");
const jwt = require("jsonwebtoken");
const speakeasy = require("@levminer/speakeasy");
const { verifyRefresh } = require("../helper");

let secret = speakeasy.generateSecret({ length: 20 });
const otpGenerate = async (req, res) => {
  const { email } = req.body;
  let currentTime = Math.floor(Date.now() / 1000);
  let decoded;
  if (!email) {
    const token = req.cookies.accessToken;
    if (!token) return res.status(403).send("Email Access Denied. Please login again.");
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  }

  const tokenValidDuration = 30;

  let expirationTime = currentTime + tokenValidDuration;
  let expirationTimeString = new Date(expirationTime * 1000).toLocaleTimeString();
  // Generate the OTP
  const code = speakeasy.totp({
    secret: secret.base32,
    encoding: "base32",
    time: currentTime,
  });
  const sendMessage = `Your OTP is: ${code}, Expires in: ${expirationTimeString}, Valid for: 30s`;
  await sendEmail(decoded?.UserInfo?.email || email, "Verify your OTP", sendMessage);

  res.json({ code, expiresIn: expirationTimeString, durations: "30s" });
};

const verifyOtp = async (req, res) => {
  const { code } = req.body;
  const tokenValidates = speakeasy.totp.verify({
    secret: secret.base32,
    encoding: "base32",
    token: code,
    time: Math.floor(Date.now() / 1000),
  });
  res.json({ tokenValidates });
};
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
  await login(req.body, Role.organzier, res, req);
};
const loginForAdmin = async (req, res) => {
  await login(req.body, Role.staff, res);
};
const generateToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(403).send("Access denied.");
  const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
  const email = decoded.email;
  const { isValid, role } = verifyRefresh(email, refreshToken);

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
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  res.json({
    success: true,
    message: "Successfully access token created",
    expiresIn: "5m",
  });
};
module.exports = {
  verifyOtp,
  otpGenerate,
  loginForAdmin,
  generateToken,
  loginForOrganzier,
  signupForStaff,
  signupForVerification,
  signupForOrganizer,
};
