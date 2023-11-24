const mongoose = require("mongoose");
const role = require("../config/role");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    name: { type: String },
    phone: { type: String },
    email: { type: String },
    password: { type: String },
    role: {
      type: String,
      default: "staff",
      enum: [role.superAdmin, role.staff],
    },
    isActive: { type: Boolean },
    isVerifiy: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
