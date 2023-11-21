const router = require("express").Router();
const {
  addOrganizerInvoice,
  getAllOrganizerInvoice,
  getOrganizerInvoiceById,
} = require("../controllers/organizerInvoiceController");

router.get("/all", getAllOrganizerInvoice);

router.get("/:organizerInvoiceId", getOrganizerInvoiceById);

router.post("/create", addOrganizerInvoice);

module.exports = router;
