const router = require("express").Router();
const {
  signupForStaff,
  signupForOrganizer,
  signupForVerification,
  loginForAdmin,
  loginForOrganzier,
} = require("../controllers/authController");

router.post("/signup_staff", signupForStaff);
router.post("/signup_organizer", signupForOrganizer);
router.get("/verify/:userId/:token", signupForVerification);
router.post("/login_staff", loginForAdmin);
router.post("/login_organizer", loginForOrganzier);

module.exports = router;
