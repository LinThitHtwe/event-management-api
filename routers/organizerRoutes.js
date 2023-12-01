const {
  create_organizer,
  get_organizers,
  get_organizer_by_id,
  get_organizer_byId,
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
router.patch("/update", update_organizer);
router.patch("/update_level/:level", manage_organizer_level);
router.patch("/update_status/:status", manage_organizer_status);
router.patch("/update_phone/:phone", change_phone);
router.patch("/update_email/:email", change_email);
router.get("/get_all", permissionByRole(Role.superAdmin), verifyjwt, get_organizers);
router.get("/all", get_organizers);

router.get("", permissionByRole(Role.organzier), verifyjwt, get_organizer_by_id);
router.get("/all/:organizerId", get_organizer_byId);


module.exports = router;
