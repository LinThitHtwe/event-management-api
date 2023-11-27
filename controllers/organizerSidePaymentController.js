const { get_payment_by_organizer_id } = require("../services/paymentService");

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

module.exports = {
  getAllPaymentsByOrganizerId,
};
