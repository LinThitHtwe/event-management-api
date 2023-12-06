const { getOrganizerIdFromToken } = require("../helper");
const {
  get_payment_by_organizer_id,
  update_payment,
  add_payment,
} = require("../services/paymentService");

const messages = {
  notFound: "No Data Found",
  serverError: "Internal Server Error",
};

const getAllPaymentsByOrganizerId = async (req, res) => {
  const id = await getOrganizerIdFromToken(req, res);
  console.log(id);
  try {
    const allPaymentsByOrganizer = await get_payment_by_organizer_id(id);

    if (allPaymentsByOrganizer.length <= 0) {
      return res.status(404).json({ message: messages.notFound });
    }
    return res.status(200).json(allPaymentsByOrganizer);
  } catch (error) {
    return res.status(500).json({ message: messages.serverError });
  }
};


const getAllPaymentsByOrganizerIdAdmin = async (req, res) => {
  const id = await req.params.organizerId
  console.log(id);
  try {
    const allPaymentsByOrganizer = await get_payment_by_organizer_id(id);

    if (allPaymentsByOrganizer.length <= 0) {
      return res.status(404).json({ message: messages.notFound });
    }
    return res.status(200).json(allPaymentsByOrganizer);
  } catch (error) {
    return res.status(500).json({ message: messages.serverError });
  }
};

const addOrganizerPayment = async (req, res) => {
  const id = await getOrganizerIdFromToken(req, res);
  const paymentData = req.body.payment;
  const response = [];
  for (const payment of paymentData) {
    try {
      const addedPayment = await add_payment({ ...payment, organizer: id });
      response.push(addedPayment);
    } catch (error) {
      return res.json(error);
    }
  }

  return res.json(response);
};

const updateOrganizerPayment = async (req, res) => {
  const { paymentId } = req.params;
  const paymentData = req.body;
  try {
    const payment = await update_payment(paymentId, paymentData);
    if (payment.error) {
      return res.status(400).json(payment.error);
    }
    res.json(payment);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  getAllPaymentsByOrganizerId,
  updateOrganizerPayment,
  addOrganizerPayment,
  getAllPaymentsByOrganizerIdAdmin
};
