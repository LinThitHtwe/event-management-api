const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const organizersOfEventSchema = new Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizer",
    },
  },
  { timestamps: true }
);

const OrganizersOfEvent = mongoose.model(
  "OrganizersOfEvent",
  organizersOfEventSchema
);
module.exports = OrganizersOfEvent;
