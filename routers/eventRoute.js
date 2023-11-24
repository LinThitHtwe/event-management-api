const router = require("express").Router();

const {
  getSortValue,
  postCreateEvent,
  getEvent,
  searchValue,
  bootsList,
  getEventById,
  makeBoots,
  getTotalAvailableTicketByEvent,
} = require("../controllers/eventController");

router.get("/sort", getSortValue);
router.get("/", getEvent);
router.post("/create", postCreateEvent);
router.get("/search", searchValue);
router.get("/boots", bootsList);
router.post("/boots/:id", makeBoots);
router.get("/:eventId", getEventById);
router.get("/create", () => console.log("hi"));
router.get("/total-avaliable-ticket/:eventId", getTotalAvailableTicketByEvent);

module.exports = router;
