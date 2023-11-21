const adminService = require("../services/adminService");

const createAdmin = async (req, res) => {
  try {
    const adminData = req.body;
    const result = await adminService.add_admin(adminData);
    res.json(result);
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const findAllAdmin = async (req, res) => {
  try {
    const result = await adminService.get_all_admin();
    res.json(result);
  } catch (err) {
    console.error("Error finding admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAdminById = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const result = await adminService.get_admin_by_id(adminId);
    res.json(result);
  } catch (err) {
    console.error("Error finding admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateStaff = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const updatedData = req.body;

    const result = await adminService.update(adminId, updatedData);
    res.json(result);
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deActivate = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const data = adminService.get_admin_by_id(adminId);
    data.isActive = false;
    const result = await adminService.update(adminId, data);
    res.json(result);
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createAdmin,
  findAllAdmin,
  getAdminById,
  updateStaff,
  deActivate,
};
