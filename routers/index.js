const router = require("express").Router();
const customerRoutes = require('./customerRoutes')

router.get("/user", () => console.log("using user"));
router.use('/customer',customerRoutes);

module.exports = router;
