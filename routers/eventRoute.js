const router = require("express").Router();

const {
  getSortValue,
  postCreateEvent,
  getEvent,
  searchValue,
  boostsList,
  getEventById,
  makeBoosts,
  getTotalAvailableTicketByEvent,
} = require("../controllers/eventController");

router.get("/sort", getSortValue);
router.get("/", getEvent);
router.post("/create", postCreateEvent);
router.get("/search", searchValue);
router.get("/boost", boostsList);
router.post("/boost/:id", makeBoosts);
router.get("/find/:eventId", getEventById);
router.get("/total-avaliable-ticket/:eventId", getTotalAvailableTicketByEvent);

module.exports = router;
