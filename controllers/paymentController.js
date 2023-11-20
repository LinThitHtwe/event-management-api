const {
  get_all_upgrade_payment,
  get_upgrade_payment_by_id,
  add_upgrade_payment,
  upgrade_upgrade_payment,
} = require("../services/upgradePaymentService");

const getAllPaymentForAccountUpgradeAndTrendingLevel = async (req, res) => {
  const data = await get_all_upgrade_payment();
  return res.json(data);
};

const addPaymentForAccountUpgradeAndTrendingLevel = (req, res) => {
  const data = add_upgrade_payment(req.body);
  return res.json(data);
};

const getOnePaymentForAccountUpgradeAndTrendingLevel = async (req, res) => {
  const updatePaymentId = req.params.upgradePaymentId;
  const data = await get_upgrade_payment_by_id(updatePaymentId);
  return res.json(data);
};

const updatePaymentForAccountUpgradeAndTrendingLevel = async (req, res) => {
  const updatePaymentId = req.params.upgradePaymentId;
  const data = await upgrade_upgrade_payment(updatePaymentId, req.body);
  return res.json(data);
};

module.exports = {
  getAllPaymentForAccountUpgradeAndTrendingLevel,
  getOnePaymentForAccountUpgradeAndTrendingLevel,
  addPaymentForAccountUpgradeAndTrendingLevel,
  updatePaymentForAccountUpgradeAndTrendingLevel,
};
