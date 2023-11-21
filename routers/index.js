const router = require("express").Router();
const admin = require("./adminRoutes");
const organizerRouter = require("./organizerRoutes");
const upgradePaymentRoutes = require("./upgradePaymentRoutes");
const organizerInvoiceRoutes = require("./organizerInvoiceRoutes");

router.use("/admin", admin);
router.use("/organizer", organizerRouter);
router.use("/organizer-invoice/", organizerInvoiceRoutes);
router.use("/upgrade-payment/", upgradePaymentRoutes);

module.exports = router;
