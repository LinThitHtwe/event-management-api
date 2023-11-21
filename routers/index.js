const router = require("express").Router();
const authRouter = require("./authRouter");
const customerRoutes = require('./customerRoutes')
const organizerRouter = require("./organizerRoutes");
const eventRoute = require("./eventRoute");
const admin = require("./adminRoutes");
const upgradePaymentRoutes = require("./upgradePaymentRoutes");
const organizerInvoiceRoutes = require("./organizerInvoiceRoutes");


router.get("/user", () => console.log("using user"));
router.use("/auth", authRouter);
router.use('/customer',customerRoutes);
router.use("/admin", admin);
router.use("/organizer", organizerRouter);
router.use("/organizer-invoice/", organizerInvoiceRoutes);
router.use("/event", eventRoute);
router.use("/upgrade-payment/", upgradePaymentRoutes);

module.exports = router;
