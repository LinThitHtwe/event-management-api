const router = require("express").Router();
const eventRoute = require("./eventRoute");

router.get("/user", () => console.log("using user"));
router.use("/event", eventRoute );

module.exports = router;
