const router = require("express").Router();
const {
  signupForStaff,
  signupForOrganizer,
  signupForVerification,
} = require("../controllers/authController");

router.post("/signup_staff", signupForStaff);
router.post("/signup_organizer", signupForOrganizer);
router.get("/verify/:userId/:token", signupForVerification);

module.exports = router;
