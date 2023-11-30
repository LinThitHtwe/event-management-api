const {
  totalTicketSale,
  getAllOverviewData,
} = require("../controllers/organizerDashboardController");

const router = require("express").Router();

router.get("/barchart", totalTicketSale);
router.get("/overview-data", getAllOverviewData);

module.exports = router;
