const jwt = require("jsonwebtoken");
const permissionByRole = (role) => {
  return (req, res, next) => {
    try {
      const token = req.cookies.accessToken;
      if (!token) return res.status(403).send("Access denied.");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userRole = decoded.UserInfo.role;
      if (userRole === role) {
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
