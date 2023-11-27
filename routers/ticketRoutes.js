const {
  create_ticket,
  get_tickets,
  get_filtered_tickets,
} = require("../controllers/ticketController");

const router = require("express").Router();

router.get("/get_tickets", get_filtered_tickets);
router.post("/create", create_ticket);

module.exports = router;
