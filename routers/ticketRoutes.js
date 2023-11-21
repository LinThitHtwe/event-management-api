const {
  create_ticket,
  get_tickets,
} = require("../controllers/ticketController");

const router = require("express").Router();

router.get("/", get_tickets);
router.post("/create", create_ticket);

module.exports = router;
