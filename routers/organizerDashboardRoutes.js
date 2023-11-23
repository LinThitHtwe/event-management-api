const {
  totalTicketSale,
  getAllOverviewData,
} = require("../controllers/organizerDashboardController");

const router = require("express").Router();

router.get("/barchart/:organizerId", totalTicketSale);
router.get("/overview-data/:organizerId", getAllOverviewData);

module.exports = router;
