const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const upgradePaymentSchema = new Schema(
  {
    name: { type: String },
    phone: { type: String },
  },
  { timestamps: true }
);

const UpgradePayment = mongoose.model("UpgradePayment", upgradePaymentSchema);
module.exports = UpgradePayment;
