const {
  get_organizer_by_id_from_public_side,
} = require("../controllers/organizerController");

const express = require("express");
const router = express.Router();

router.get("/:id", get_organizer_by_id_from_public_side);

module.exports = router;
