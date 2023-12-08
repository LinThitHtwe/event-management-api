const router = require("express").Router();
const authRouter = require("./authRouter");
const customerRoutes = require("./customerRoutes");
const organizerRouter = require("./organizerRoutes");
const eventRoute = require("./eventRoute");
const admin = require("./adminRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const upgradePaymentRoutes = require("./upgradePaymentRoutes");
const organizerInvoiceRoutes = require("./organizerInvoiceRoutes");
const organizerDashboardRoutes = require("./organizerDashboardRoutes");
const organizerSidePaymentRoutes = require("./organizerSidePaymentRoutes");
const ticketRoutes = require("./ticketRoutes");
const publicOrganizerRoute = require("./publicSideOrganizerRoute");
const Role = require("../config/role");

const permissionByRole = require("../middleware/rolePermission");
const { imageUpload } = require("../helper");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });
router.get("/user", () => console.log("using user"));
router.use("/auth", authRouter);
router.use("/customer", customerRoutes);
router.use("/admin", admin);
router.use("/dashboard", dashboardRoutes);
router.use("/organizer", organizerRouter);
router.use("/public-organizer", publicOrganizerRoute);
router.use("/organizer-payment", organizerSidePaymentRoutes);
router.use("/organizer-invoice", organizerInvoiceRoutes);
router.use("/event", eventRoute);
router.use("/ticket", ticketRoutes);
router.use("/upgrade-payment", upgradePaymentRoutes);
router.use("/organizer-dashboard", organizerDashboardRoutes);
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const imageUrl = await imageUpload(req); // Assuming imageUpload is an async function
    console.log("Image processing completed");
    res.json({ imageUrl });
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});
module.exports = router;
