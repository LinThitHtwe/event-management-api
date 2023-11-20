const router = require("express").Router();
const admin = require("./adminRoutes")

router.get("/user", () => console.log("using user"));
router.use('/admin', admin)

module.exports = router;
