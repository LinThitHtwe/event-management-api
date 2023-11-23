const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketInfoSchema = new Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    quantity: { type: Number },
    type: { type: String },
    price: { type: Number },
  },
  { timestamps: true }
);

const TicketInfo = mongoose.model("TicketInfo", ticketInfoSchema);
module.exports = TicketInfo;
