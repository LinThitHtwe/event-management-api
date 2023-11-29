const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    name: { type: String },
    eventStartDate: { type: Date },
    eventEndDate: { type: Date },
    ticketOpenDate: { type: Date },
    ticketCloseDate: { type: Date },
    contact: { type: String },
    location: { type: String },
    thumbnail: [{ type: String }],
    description: { type: String },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "Organizer" },
    trendingLevel: { type: Number },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
