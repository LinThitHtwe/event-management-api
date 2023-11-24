const Admin = require("../models/admin");

const get_all_admin = async () => {
  try {
    const result = await Admin.find().sort({ createdAt: -1 });
    return result;
  } catch (error) {
    return error;
  }
};

const get_admin_by_id = async (adminId) => {
  try {
    const result = await Admin.findById(adminId);
    return result;
  } catch (error) {
    return { error: error };
  }
};

const add_admin = async (adminData) => {
  const admin = new Admin(adminData);
  try {
    admin.isActive = true;
    admin.role = "staff";
    const result = await admin.save();
    return result;
  } catch (error) {
    return error;
  }
};

const update = async (adminId, updatedData) => {
  try {
    const result = await Admin.findByIdAndUpdate(adminId, updatedData, {
      new: true,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  get_all_admin,
  get_admin_by_id,
  add_admin,
  update,
};
