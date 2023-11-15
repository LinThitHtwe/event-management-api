const router = require("express").Router();

router.get("/", () => console.log("using router"));

module.exports = router;
