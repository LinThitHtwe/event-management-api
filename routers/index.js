const router = require("express").Router();
const organizerRouter = require('./organizerRoutes');
const upgradePaymentRoutes = require("./upgradePaymentRoutes");

router.get("/user", () => console.log("using user"));
router.use("/organizer", organizerRouter);
router.use("/upgrade-payment/", upgradePaymentRoutes);

module.exports = router;
