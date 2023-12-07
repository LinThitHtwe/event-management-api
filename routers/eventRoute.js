const router = require("express").Router();

const {
  boostEvent,
  getSortValue,
  postCreateEvent,
  getEvent,
  boostsList,
  getEventById,
  makeBoosts,
  getTotalAvailableTicketByEvent,
  getEventsByOrganizerId,
  getEvents,
  getEventsByOrganizer_Id,
  paymentsByEvent,
} = require("../controllers/eventController");

router.get("/sort", getSortValue);
router.get("/", getEvents);
router.post("/create", postCreateEvent);
router.get("/boost", boostsList);
router.post("/boost", boostEvent);
router.get("/find/:eventId", getEventById);
router.get("/total-avaliable-ticket/:eventId", getTotalAvailableTicketByEvent);
router.get("/events-by-organizer", getEventsByOrganizerId);
router.get("/events-by-organizer/:organizerId", getEventsByOrganizer_Id);
router.get("/payments/:eventId", paymentsByEvent);

module.exports = router;
