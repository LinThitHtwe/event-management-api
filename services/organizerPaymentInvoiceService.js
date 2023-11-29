const OrganizerPaymentInvoice = require("../models/organizerPaymentInvoice");

const get_all_organizer_payment_invoice = async () => {
  try {
    const result = await OrganizerPaymentInvoice.find().sort({ createdAt: -1 });
    return result;
  } catch (error) {
    return error;
  }
};

const get_organizer_payment_invoice_by_id = async (organizerPaymentInvoiceId) => {
  try {
    const result = await OrganizerPaymentInvoice.findById(organizerPaymentInvoiceId);

    return { data: result };
  } catch (error) {
    return error;
  }
};

const add_organizer_payment_invoice = async (organizerPaymentInvoiceData) => {
  const organizerPaymentInvoice = new OrganizerPaymentInvoice(organizerPaymentInvoiceData);
  try {
    const result = await organizerPaymentInvoice.save();
    return result;
  } catch (error) {
    return { error: error };
  }
};

module.exports = {
  get_all_organizer_payment_invoice,
  get_organizer_payment_invoice_by_id,
  add_organizer_payment_invoice,
};
