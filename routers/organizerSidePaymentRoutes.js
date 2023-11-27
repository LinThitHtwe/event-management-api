const {
  getAllPaymentsByOrganizerId,
} = require("../controllers/organizerSidePaymentController");
const express = require("express");
const router = express.Router();

router.get("/all/:organizerId", getAllPaymentsByOrganizerId);

module.exports = router;
