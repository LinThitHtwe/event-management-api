const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketInfoSchema = new Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    quantity: { type: String },
    type: { type: String },
    price: { type: String },
  },
  { timestamps: true }
);

const TicketInfo = mongoose.model("TicketInfo", ticketInfoSchema);
module.exports = TicketInfo;
