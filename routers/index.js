const router = require("express").Router();
const authRouter = require("./authRouter");
const customerRoutes = require("./customerRoutes");
const organizerRouter = require("./organizerRoutes");
const eventRoute = require("./eventRoute");
const admin = require("./adminRoutes");
const upgradePaymentRoutes = require("./upgradePaymentRoutes");
const organizerInvoiceRoutes = require("./organizerInvoiceRoutes");
const organizerDashboardRoutes = require("./organizerDashboardRoutes");
const organizerSidePaymentRoutes = require("./organizerSidePaymentRoutes");
const ticketRoutes = require("./ticketRoutes");
const Role = require("../config/role");
const permissionByRole = require("../middleware/rolePermission");

router.get("/user", () => console.log("using user"));
router.use("/auth", authRouter);
router.use("/customer", customerRoutes);
router.use("/admin", admin);
router.use("/organizer", organizerRouter);
router.use("/organizer-payment", organizerSidePaymentRoutes);
router.use("/organizer-invoice", organizerInvoiceRoutes);
router.use("/event", eventRoute);
router.use("/ticket", ticketRoutes);
router.use("/upgrade-payment", upgradePaymentRoutes);
router.use("/organizer-dashboard", organizerDashboardRoutes);
module.exports = router;
