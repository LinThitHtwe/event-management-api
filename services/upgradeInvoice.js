const UpgradeInvoice = require("../models/upgradeInvoice");

const get_all_upgradeInvoice = async () => {
  try {
    const result = await UpgradeInvoice.find().sort({ createdAt: -1 });
    return result;
  } catch (error) {
    return error;
  }
};

const get_upgradeInvoice_by_id = async (upgradeInvoiceId) => {
  try {
    const result = await UpgradeInvoice.findById(upgradeInvoiceId);
    return result;
  } catch (error) {
    return error;
  }
};

const add_upgradeInvoice = async (upgradeInvoiceData) => {
  const upgradeInvoice = new UpgradeInvoice(upgradeInvoiceData);
  try {
    const result = await upgradeInvoice.save();
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  get_all_upgradeInvoice,
  get_upgradeInvoice_by_id,
  add_upgradeInvoice,
};
