const router = require("express").Router();
const {
  getAllPaymentForAccountUpgradeAndTrendingLevel,
  getOnePaymentForAccountUpgradeAndTrendingLevel,
  addPaymentForAccountUpgradeAndTrendingLevel,
  updatePaymentForAccountUpgradeAndTrendingLevel,
  upgradePaymentDisableEnable,
} = require("../controllers/upgradePaymentController");

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

router.put("/disable/:upgradePaymentId", upgradePaymentDisableEnable);

module.exports = router;
