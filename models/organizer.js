const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const role = require("../config/role");
const organizerSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    password: { type: String },
    companyName: { type: String },
    thumbnail: { type: String },
    contact: { type: String },
    accountLevel: { type: Number },
    accountStatus: { type: String, default: "inactive" },
    bio: { type: String },
    role: { type: String, default: role.organzier },
    isVerify: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Organizer = mongoose.model("Organizer", organizerSchema);
module.exports = Organizer;
