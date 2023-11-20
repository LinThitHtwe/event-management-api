const router = require("express").Router();
const upgradePaymentRoutes = require("./upgradePaymentRoutes");
router.use("/upgrade-payment/", upgradePaymentRoutes);

module.exports = router;
