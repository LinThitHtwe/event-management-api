const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    name: { type: String },
    phone: { type: String },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizer",
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
