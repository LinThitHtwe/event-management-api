const {
  getAllPaymentsByOrganizerId,
  addOrganizerPayment,
  updateOrganizerPayment,
  getAllPaymentsByOrganizerIdAdmin,
} = require("../controllers/organizerSidePaymentController");
const express = require("express");
const router = express.Router();

router.get("/all/:organizerId", getAllPaymentsByOrganizerIdAdmin);
router.get("/all", getAllPaymentsByOrganizerId);
router.post("/create", addOrganizerPayment);
router.put("/update/:paymentId", updateOrganizerPayment);

module.exports = router;
