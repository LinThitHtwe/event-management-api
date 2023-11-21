const router = require("express").Router();
<<<<<<< HEAD
const authRouter = require("./authRouter");

router.get("/user", () => console.log("using user"));
router.use("/auth", authRouter);
=======
const customerRoutes = require('./customerRoutes')
const organizerRouter = require("./organizerRoutes");
const eventRoute = require("./eventRoute");
const admin = require("./adminRoutes");
const upgradePaymentRoutes = require("./upgradePaymentRoutes");
const organizerInvoiceRoutes = require("./organizerInvoiceRoutes");

router.use('/customer',customerRoutes);
router.use("/admin", admin);
router.use("/organizer", organizerRouter);
router.use("/organizer-invoice/", organizerInvoiceRoutes);
router.use("/event", eventRoute );
router.use("/upgrade-payment/", upgradePaymentRoutes);
>>>>>>> 5f56995f3bfbb5a6991b6c52d1c43cf2abd5e0e1

module.exports = router;
