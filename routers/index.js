const ticketRoutes = require("./ticketRoutes");

const router = require("express").Router();

router.get("/user", () => console.log("using user"));
router.get("/ticket", ticketRoutes);

module.exports = router;
