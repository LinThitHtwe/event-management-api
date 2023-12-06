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

const getAllPaymentForAccountUpgradeAndTrendingLevel = async (req, res) => {
  try {
    const data = await get_all_upgrade_payment();

    if (data.length > 0) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: messages.notFound });
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

const upgradePaymentDisableEnable = async (req, res) => {
  const updatePaymentId = req.params.upgradePaymentId;
  try {
    const existingData = await get_upgrade_payment_by_id(updatePaymentId);

    if (existingData.error) {
      return res.status(500).json({ message: messages.serverError });
    }
    const updatedData = await upgrade_upgrade_payment(updatePaymentId, {
      ...existingData,
      isActive: !existingData.data.isActive,
    });

    if (updatedData.data) {
      return res.status(200).json(updatedData);
    } else {
      return res.status(404).json({ message: messages.notFound });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: messages.serverError });
  }
};

module.exports = {
  getAllPaymentForAccountUpgradeAndTrendingLevel,
  getOnePaymentForAccountUpgradeAndTrendingLevel,
  addPaymentForAccountUpgradeAndTrendingLevel,
  updatePaymentForAccountUpgradeAndTrendingLevel,
  upgradePaymentDisableEnable,
};
