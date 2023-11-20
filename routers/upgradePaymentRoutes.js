const router = require("express").Router();
const {
  getAllPaymentForAccountUpgradeAndTrendingLevel,
  getOnePaymentForAccountUpgradeAndTrendingLevel,
  addPaymentForAccountUpgradeAndTrendingLevel,
  updatePaymentForAccountUpgradeAndTrendingLevel,
} = require("../controllers/paymentController");

router.get("/all", getAllPaymentForAccountUpgradeAndTrendingLevel);

router.get(
  "/:upgradePaymentId",
  getOnePaymentForAccountUpgradeAndTrendingLevel
);

router.post("/add", addPaymentForAccountUpgradeAndTrendingLevel);
router.put(
  "/update/:upgradePaymentId",
  updatePaymentForAccountUpgradeAndTrendingLevel
);

router.put(
  "/disable/:upgradePaymentId",
  updatePaymentForAccountUpgradeAndTrendingLevel
);

module.exports = router;
