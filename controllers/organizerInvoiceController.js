const {
  add_organizer_payment_invoice,
  get_all_organizer_payment_invoice,
  get_organizer_payment_invoice_by_id,
} = require("../services/organizerPaymentInvoiceService");

const messages = {
  notFound: "No Data Found",
  serverError: "Internal Server Error",
};

const addOrganizerInvoice = async (req, res) => {
  try {
    const data = await add_organizer_payment_invoice(req.body);
    if (data.length > 0) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: messages.notFound });
    }
  } catch (error) {
    return res.status(500).json({ message: messages.serverError });
  }
};

const getAllOrganizerInvoice = async (req, res) => {
  try {
    const data = await get_all_organizer_payment_invoice();
    if (data.length > 0) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: messages.notFound });
    }
  } catch (error) {
    return res.status(500).json({ message: messages.serverError });
  }
};

const getOrganizerInvoiceById = async (req, res) => {
  const organizerInvoiceId = req.params.organizerInvoiceId;
  try {
    const data = await get_organizer_payment_invoice_by_id(organizerInvoiceId);
    if (data.data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: messages.notFound });
    }
  } catch (error) {
    return res.status(500).json({ message: messages.serverError });
  }
};

module.exports = {
  addOrganizerInvoice,
  getAllOrganizerInvoice,
  getOrganizerInvoiceById,
};
