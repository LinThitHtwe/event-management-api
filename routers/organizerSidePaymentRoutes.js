const {
  getAllPaymentsByOrganizerId,
  addOrganizerPayment,
  updateOrganizerPayment,
} = require("../controllers/organizerSidePaymentController");
const express = require("express");
const router = express.Router();

router.get("/all", getAllPaymentsByOrganizerId);
router.post("/create", addOrganizerPayment);
router.put("/update/:paymentId", updateOrganizerPayment);

module.exports = router;
