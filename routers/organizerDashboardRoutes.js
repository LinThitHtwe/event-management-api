const {
  totalTicketSale,
} = require("../controllers/organizerDashboardController");

const router = require("express").Router();

router.get("/", totalTicketSale);

module.exports = router;
