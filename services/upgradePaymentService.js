const UpgradePayment = require("../models/upgradePayment");

const get_all_upgrade_payment = async () => {
  try {
    const result = await UpgradePayment.find().sort({ createdAt: -1 });
    return result;
  } catch (error) {
    return error;
  }
};

const get_upgrade_payment_by_id = async (upgradePaymentId) => {
  try {
    const result = await UpgradePayment.findById(upgradePaymentId);
    return result;
  } catch (error) {
    return error;
  }
};

const add_upgrade_payment = async (upgradePaymentData) => {
  const upgradePayment = new UpgradePayment(upgradePaymentData);
  try {
    const result = await upgradePayment.save();
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  get_all_upgrade_payment,
  get_upgrade_payment_by_id,
  add_upgrade_payment,
};
