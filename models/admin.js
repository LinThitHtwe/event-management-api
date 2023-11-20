const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    name: { type: String },
    phone: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String },
    isActive: { type: Boolean },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
