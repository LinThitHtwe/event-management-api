const router = require("express").Router();
const adminController = require("../controllers/adminController");

router.post("/create", adminController.createAdmin);
router.get("/find-all-admin", adminController.findAllAdmin);
router.get("/:adminId", adminController.getAdminById);
router.put("/update/:adminId", adminController.updateStaff);
router.put("/deactivate/:adminId", adminController.deActivate);

module.exports = router;
