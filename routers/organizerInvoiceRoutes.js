const router = require("express").Router();
const {
  addOrganizerInvoice,
  getAllOrganizerInvoice,
  getOrganizerInvoiceById,
  upgradeOrganizerPayment,
} = require("../controllers/organizerInvoiceController");

router.get("/all", getAllOrganizerInvoice);

router.get("/:organizerInvoiceId", getOrganizerInvoiceById);

router.post("/upgradeOrganizerLevel", upgradeOrganizerPayment);

module.exports = router;
