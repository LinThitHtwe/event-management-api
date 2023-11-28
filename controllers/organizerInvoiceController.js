const {
  add_organizer_payment_invoice,
  get_all_organizer_payment_invoice,
  get_organizer_payment_invoice_by_id,
} = require("../services/organizerPaymentInvoiceService");
const { manage_organizer_level } = require("../services/organizerService");
const { getOrganizerIdFromToken } = require("../helper/index");
const messages = {
  notFound: "No Data Found",
  serverError: "Internal Server Error",
};

const addOrganizerInvoice = async (req, res) => {
  try {
    const data = await add_organizer_payment_invoice(req.body);
    console.log(data);
    if (!data.error) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: messages.notFound });
    }
  } catch (error) {
    return res.status(500).json({ message: messages.serverError });
  }
};

const upgradeOrganizerPayment = async (req, res) => {
  try {
    const id = await getOrganizerIdFromToken(req, res);
    if (id === null) {
      return res.status(403).send("Invalid token.");
    }

    const accountLevelId = req.body.subscription.accountLevelId;

    const payment = await add_organizer_payment_invoice(req.body.payment);

    const upgradeAccount = await manage_organizer_level(id, accountLevelId);

    if (!payment.error) {
      return res.status(200).json({ payment, upgradeAccount });
    } else {
      return res.status(404).json({ message: messages.notFound });
    }
  } catch (error) {
    res.json({ error });
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
  upgradeOrganizerPayment,
};
