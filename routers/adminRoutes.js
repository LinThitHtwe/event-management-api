const router = require("express").Router();
const {
  createAdmin,
  findAllAdmin,
  getAdminById,
  updateStaff,
  deActivate,
  getAllPaymentForAccountUpgradeAndTrendingLevel,
  getOnePaymentForAccountUpgradeAndTrendingLevel,
  addPaymentForAccountUpgradeAndTrendingLevel,
  updatePaymentForAccountUpgradeAndTrendingLevel,
} = require("../controllers/adminController");

router.post("/create", createAdmin);
router.get("/", findAllAdmin);
router.get("/find/:adminId", getAdminById);
router.put("/update/:adminId", updateStaff);
router.put("/deactivate/:adminId", deActivate);
router.get("/payment", getAllPaymentForAccountUpgradeAndTrendingLevel);
router.get(
  "/payment/:paymentId",
  getOnePaymentForAccountUpgradeAndTrendingLevel
);
router.post("/payment/create", addPaymentForAccountUpgradeAndTrendingLevel);
router.put(
  "/payment/update/:paymentId",
  updatePaymentForAccountUpgradeAndTrendingLevel
);

module.exports = router;
