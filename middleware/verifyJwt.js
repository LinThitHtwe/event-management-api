const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyjwt = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) return res.status(403).send("Access denied.");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (req.params.id && decoded.UserInfo.id !== req.params.id) {
      return res
        .status(403)
        .send("Access denied. You do not have permission to access this resource.");
    }
    req.email = decoded;

    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

module.exports = verifyjwt;
