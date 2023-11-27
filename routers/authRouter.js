const router = require("express").Router();
const {
  signupForStaff,
  signupForOrganizer,
  signupForVerification,
  loginForAdmin,
  loginForOrganzier,
  generateToken,
  otpGenerate,
  verifyOtp,
} = require("../controllers/authController");

router.post("/signup_staff", signupForStaff);
router.post("/signup_organizer", signupForOrganizer);
router.get("/verify/:userId", signupForVerification);
router.post("/login_staff", loginForAdmin);
router.post("/login_organizer", loginForOrganzier);
router.post("/refresh", generateToken);
router.post("/get_otpcode", otpGenerate);
router.post("/verify_otpcode", verifyOtp);

module.exports = router;
