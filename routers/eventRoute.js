const router = require("express").Router();

const eventController = require("../controllers/eventController");

router.get("/sort", eventController.getSortValue);
router.get("/", eventController.getEvent);
router.get("/search", eventController.searchValue);
router.get("/boots", eventController.bootsList);
router.get("/:eventId", eventController.getEventById);
router.get("/create", () => console.log("hi")); //make to get organizer id, createby and trending with bluemark

module.exports = router;
