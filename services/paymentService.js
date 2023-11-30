const Payment = require("../models/payment");

const get_all_payment = async () => {
  try {
    const result = await Payment.find().sort({ createdAt: -1 });
    return result;
  } catch (error) {
    return error;
  }
};

const get_payment_by_id = async (paymentId) => {
  try {
    const result = await Payment.findById(paymentId);
    return result;
  } catch (error) {
    return error;
  }
};

const get_payment_by_organizer_id = async (organizerId) => {
  try {
    const result = await Payment.find({ organizer: organizerId });
    return result;
  } catch (error) {
    return { error: error };
  }
};

const add_payment = async (paymentData) => {
  const payment = new Payment(paymentData);
  try {
    const result = await payment.save();
    return result;
  } catch (error) {
    return error;
  }
};
const update_payment = async (paymentId, PaymentData) => {
  try {
    const payment = await Payment.findOneAndUpdate({ _id: paymentId }, PaymentData);

    if (!payment) {
      throw "Payment No Found";
    }

    return payment;
  } catch (error) {
    return { error: error };
  }
};

module.exports = {
  get_all_payment,
  get_payment_by_id,
  add_payment,
  get_payment_by_organizer_id,
  update_payment,
};
