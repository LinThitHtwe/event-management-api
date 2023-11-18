const Customer = require("../models/customer");

const get_all_customer = async () => {
  try {
    const result = await Customer.find().sort({ createdAt: -1 });
    return result;
  } catch (error) {
    return error;
  }
};

const get_customer_by_id = async (customerId) => {
  try {
    const result = await Customer.findById(customerId);
    return result;
  } catch (error) {
    return error;
  }
};

const add_customer = async (customerData) => {
  const customer = new Customer(customerData);
  try {
    const result = await customer.save();
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  get_all_customer,
  get_customer_by_id,
  add_customer,
};
