const router = require("express").Router();
const {
  getEvents,
  getOrganizers,
} = require("../controllers/dashboardController");
const { getEvent } = require("../controllers/eventController");

router.get("/event", getEvents);
router.get("/organizer", getOrganizers);

module.exports = router;
