const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const organizerSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    companyName: { type: String },
    contact: { type: String },
    accountLevel: { type: String },
    bio: { type: String },
  },
  { timestamps: true }
);

const Organizer = mongoose.model("Organizer", organizerSchema);
module.exports = Organizer;
