const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const organizerSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    password: { type: String },
    companyName: { type: String },
    contact: { type: String },
    accountLevel: { type: Number },
    bio: { type: String },
    isVerify: { type: Boolean },
  },
  { timestamps: true }
);

const Organizer = mongoose.model("Organizer", organizerSchema);
module.exports = Organizer;
