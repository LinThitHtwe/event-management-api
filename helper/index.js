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

module.exports = { verifyRefresh };
