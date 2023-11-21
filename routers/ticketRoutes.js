const { add_ticket }  =require("../controllers/ticketController");

const router = require("express").Router();

router.post("/add", add_ticket);

module.exports = router;
