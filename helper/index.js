const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const verifyRefresh = (email, token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const isValid = decoded.email === email;
    const role = decoded.role;
    return { isValid, role };
  } catch (error) {
    console.error("Token verification failed", error.message);
    return { isValid: false, role: null };
  }
};

const getOrganizerIdFromToken = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(403).send("Access denied.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.UserInfo.id;
    return id;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

module.exports = { verifyRefresh, getOrganizerIdFromToken };
