const router = require("express").Router();
const eventRoute = require("./eventRoute");
const admin = require("./adminRoutes");
const organizerRouter = require('./organizerRoutes');
const upgradePaymentRoutes = require("./upgradePaymentRoutes");

router.get("/user", () => console.log("using user"));
router.use('/admin', admin)
router.use("/organizer", organizerRouter);
router.use("/event", eventRoute );
router.use("/upgrade-payment/", upgradePaymentRoutes);

module.exports = router;
