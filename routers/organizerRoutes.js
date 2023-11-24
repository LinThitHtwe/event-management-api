const {
  create_organizer,
  get_organizers,
  get_organizer_by_id,
  update_organizer,
  manage_organizer_level,
  manage_organizer_status,
  change_email,
  change_phone,
} = require("../controllers/organizerController");
const permissionByRole = require("../middleware/rolePermission");
const verifyjwt = require("../middleware/verifyJwt");
const Role = require("../config/role");

const express = require("express");
const router = express.Router();

router.post("/create", create_organizer);
router.patch("/update/:id", update_organizer);
router.patch("/update_level/:id/:level", manage_organizer_level);
router.patch("/update_status/:id/:status", manage_organizer_status);
router.patch("/update_phone/:id/:phone", change_phone);
router.patch("/update_email/:id/:email", change_email);
router.get("/get_all", get_organizers);

router.get("/:id", permissionByRole(Role.organzier), verifyjwt, get_organizer_by_id);

module.exports = router;
