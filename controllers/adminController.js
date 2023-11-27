const adminService = require("../services/adminService");
const {
  get_all_upgrade_payment,
  get_upgrade_payment_by_id,
  add_upgrade_payment,
  upgrade_upgrade_payment,
} = require("../services/upgradePaymentService");

const messages = {
  notFound: "No Data Found",
  serverError: "Internal Server Error",
};
const createAdmin = async (req, res) => {
  try {
    const adminData = req.body;
    const result = await adminService.add_admin(adminData);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: messages.serverError });
  }
};

const findAllAdmin = async (req, res) => {
  try {
    const result = await adminService.get_all_admin();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: messages.serverError });
  }
};
const getAdminById = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const result = await adminService.get_admin_by_id(adminId);
    if (result.error) {
      return res.status(404).json({ message: messages.notFound });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: messages.serverError });
  }
};

const updateStaff = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const updatedData = req.body;

    const result = await adminService.update(adminId, updatedData);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: messages.serverError });
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
    res.status(500).json({ error: messages.serverError });
  }
};

const getAllPaymentForAccountUpgradeAndTrendingLevel = async (req, res) => {
  console.log("upgradepayment");
  try {
    const data = await get_all_upgrade_payment();

    if (data.length > 0) {
      return res.status(200).json(data);
    } else {
      console.log("404");
      return res.status(404).json({ message: "nono" });
    }
  } catch (error) {
    return res.status(500).json({ message: messages.serverError });
  }
};

const addPaymentForAccountUpgradeAndTrendingLevel = (req, res) => {
  const data = add_upgrade_payment(req.body);
  return res.json(data);
};

const getOnePaymentForAccountUpgradeAndTrendingLevel = async (req, res) => {
  const updatePaymentId = req.params.upgradePaymentId;

  try {
    const data = await get_upgrade_payment_by_id(updatePaymentId);

    if (data.data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: messages.notFound });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: messages.serverError });
  }
};

const updatePaymentForAccountUpgradeAndTrendingLevel = async (req, res) => {
  const updatePaymentId = req.params.upgradePaymentId;
  try {
    const data = await upgrade_upgrade_payment(updatePaymentId, req.body);
    if (data.data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: messages.notFound });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: messages.serverError });
  }
};

module.exports = {
  createAdmin,
  findAllAdmin,
  getAdminById,
  updateStaff,
  deActivate,
  getAllPaymentForAccountUpgradeAndTrendingLevel,
  addPaymentForAccountUpgradeAndTrendingLevel,
  getOnePaymentForAccountUpgradeAndTrendingLevel,
  updatePaymentForAccountUpgradeAndTrendingLevel,
};
