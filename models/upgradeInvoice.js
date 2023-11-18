const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const upgradeInvoiceSchema = new Schema(
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
  },
  { timestamps: true }
);

const UpgradeInvoice = mongoose.model("UpgradeInvoice", upgradeInvoiceSchema);
module.exports = UpgradeInvoice;
