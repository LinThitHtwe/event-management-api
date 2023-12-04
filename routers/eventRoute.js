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
  getEventsByOrganizerId,
  getEvents,
  getEventsByOrganizer_Id,
} = require("../controllers/eventController");

router.get("/sort", getSortValue);
router.get("/", getEvents);
router.post("/create", postCreateEvent);
router.get("/search", searchValue);
router.get("/boost", boostsList);
router.post("/boost/:id", makeBoosts);
router.get("/find/:eventId", getEventById);
router.get("/total-avaliable-ticket/:eventId", getTotalAvailableTicketByEvent);
router.get("/events-by-organizer", getEventsByOrganizerId);
router.get("/events-by-organizer/:organizerId", getEventsByOrganizer_Id);

module.exports = router;
