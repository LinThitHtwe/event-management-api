const router = require("express").Router();

const eventController = require("../controllers/eventController");

router.get('/sort', eventController.getSortvalue);
router.post('/create', eventController.postCreateEvent );
router.get('/', eventController.getEvent );
router.get('/:eventId', eventController.getEventById);
router.get('/create', () => console.log("hi") );

module.exports = router;