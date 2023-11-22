const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    name: { type: String },
    eventStartDate: { type: String },
    eventEndDate: { type: String },
    ticketOpenDate: { type: String },
    ticketCloseDate: { type: String },
    contact: { type: String },
    location: { type: String },
    thumbnail: { type: String },
    description: { type: String },
    createdBy: { type: String },
    trendingLevel: { type: String },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
