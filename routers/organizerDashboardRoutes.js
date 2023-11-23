const {
  totalTicketSale,
} = require("../controllers/organizerDashboardController");

const router = require("express").Router();

router.get("/barchart/:organizerId", totalTicketSale);

module.exports = router;
