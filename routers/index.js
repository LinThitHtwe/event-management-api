const router = require("express").Router();
const organizerRouter = require('./organizerRoutes')

router.get("/user", () => console.log("using user"));
router.use("/organizer", organizerRouter);

module.exports = router;
