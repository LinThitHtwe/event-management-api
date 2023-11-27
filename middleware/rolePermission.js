const jwt = require("jsonwebtoken");

const permissionByRole = (...roles) => {
  return (req, res, next) => {
    try {
      const token = req.cookies.accessToken;
      if (!token) return res.status(403).send("Role Denied.");

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userRole = decoded.UserInfo.role;

      if (roles.includes(userRole)) {
        next();
      } else {
        res.status(403).send("Access denied.");
      }
    } catch (error) {
      res.status(400).send({ error: "Invalid token", detail: error.message });
    }
  };
};

module.exports = permissionByRole;
