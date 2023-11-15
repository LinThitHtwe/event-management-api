const router = require("express").Router();

router.get("/user", () => console.log("using user"));

module.exports = router;
