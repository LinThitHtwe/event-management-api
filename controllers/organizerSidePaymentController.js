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
  const { organizerId } = req.params;
  try {
    const allPaymentsByOrganizer = await get_payment_by_organizer_id(
      organizerId
    );

    if (allPaymentsByOrganizer.length <= 0) {
      return res.status(404).json({ message: messages.notFound });
    }
    return res.status(200).json(allPaymentsByOrganizer);
  } catch (error) {
    return res.status(500).json({ message: messages.serverError });
  }
};

const addOrganizerPayment = async (req, res) => {
  const paymentData = req.body;
  try {
    const payment = await add_payment(paymentData);
    return res.json(payment);
  } catch (error) {
    return res.json(error);
  }
};

const updateOrganizerPayment = async (req, res) => {
  const { paymentId } = req.params;
  const paymentData = req.body;
  try {
    const payment = await update_payment(paymentId, paymentData);
    res.json(payment);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  getAllPaymentsByOrganizerId,
  updateOrganizerPayment,
  addOrganizerPayment,
};
