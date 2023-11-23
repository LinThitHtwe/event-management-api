const {
  totalTicketSale,
  getAllSoldTicketsCount,
} = require("../controllers/organizerDashboardController");

const router = require("express").Router();

router.get("/barchart/:organizerId", totalTicketSale);
router.get("/total-ticket-sell/:organizerId", getAllSoldTicketsCount);

module.exports = router;
