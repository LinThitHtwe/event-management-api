const router = require("express").Router();
const organizerRouter = require("./organizerRoutes");
const eventRoute = require("./eventRoute");
const admin = require("./adminRoutes");
const upgradePaymentRoutes = require("./upgradePaymentRoutes");
const organizerInvoiceRoutes = require("./organizerInvoiceRoutes");
const ticketRoutes = require("./ticketRoutes");

router.get("/user", () => console.log("using user"));
router.use("/admin", admin);
router.use("/organizer", organizerRouter);
router.use("/organizer-invoice/", organizerInvoiceRoutes);
router.use("/event", eventRoute);
router.use("/ticket", ticketRoutes);
router.use("/upgrade-payment/", upgradePaymentRoutes);

module.exports = router;
