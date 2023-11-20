const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const organizerPaymentInvoiceSchema = new Schema(
  {
    amount: { type: String },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizer",
    },
    upgradePayment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UpgradePayment",
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  },
  { timestamps: true }
);

const OrganizerPaymentInvoice = mongoose.model(
  "organizerPaymentInvoice",
  organizerPaymentInvoiceSchema
);
module.exports = OrganizerPaymentInvoice;
