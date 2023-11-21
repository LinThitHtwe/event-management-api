const router = require("express").Router();
const organizerRouter = require("./organizerRoutes");
const eventRoute = require("./eventRoute");
const admin = require("./adminRoutes");
const upgradePaymentRoutes = require("./upgradePaymentRoutes");
const organizerInvoiceRoutes = require("./organizerInvoiceRoutes");

router.use("/admin", admin);
router.use("/organizer", organizerRouter);
router.use("/organizer-invoice/", organizerInvoiceRoutes);
router.use("/event", eventRoute );
router.use("/upgrade-payment/", upgradePaymentRoutes);

module.exports = router;
