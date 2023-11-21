const router = require("express").Router();
const authRouter = require("./authRouter");

router.get("/user", () => console.log("using user"));
router.use("/auth", authRouter);

module.exports = router;
