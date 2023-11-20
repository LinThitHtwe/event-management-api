const router = require("express").Router();
const adminController = require("../controllers/adminController");

router.post("/create", adminController.createAdmin);
router.get("/find-all-admin", adminController.findAllAdmin);
router.get("/:id", adminController.getAdminById);
router.put("/update/:id", adminController.updateStaff);
router.put("/deactivate/:id", adminController.deActivate);

module.exports = router;